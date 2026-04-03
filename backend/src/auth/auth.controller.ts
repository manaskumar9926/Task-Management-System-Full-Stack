import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/prisma';

const getJwtSecrets = () => {
  const accessSecret = process.env.JWT_SECRET;
  const refreshSecret = process.env.JWT_REFRESH_SECRET;

  if (!accessSecret || !refreshSecret) {
    throw new Error('JWT_SECRET and JWT_REFRESH_SECRET must be defined in environment variables');
  }

  return { accessSecret, refreshSecret };
};

const generateTokens = (userId: number, email: string) => {
  const { accessSecret, refreshSecret } = getJwtSecrets();

  const accessToken = jwt.sign({ userId, email }, accessSecret, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId, email }, refreshSecret, { expiresIn: '7d' });

  return { accessToken, refreshToken };
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      res.status(400).json({ message: 'Invalid email format' });
      return;
    }


    if (password.length < 6) {
      res.status(400).json({ message: 'Password must be at least 6 characters long' });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email: trimmedEmail } });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: 'User registered successfully',
      data: { userId: user.id }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({ where: { email: trimmedEmail } });

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const { accessToken, refreshToken } = generateTokens(user.id, user.email);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.status(200).json({
      message: 'Login successful',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
        },
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken: token } = req.body;
    console.log('--- Refresh Token Request ---');
    console.log('Received Token:', token ? `${token.substring(0, 10)}...` : 'None');

    if (!token) {
      console.log('Error: No token provided');
      res.status(400).json({ message: 'Refresh token is required' });
      return;
    }

    const { refreshSecret } = getJwtSecrets();
    const decoded = jwt.verify(token, refreshSecret) as { userId: number; email: string };
    console.log('Decoded Token:', decoded);

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    console.log('User found in DB:', user ? 'Yes' : 'No');

    if (!user || user.refreshToken !== token) {
      console.log('Error: Invalid refresh token or user mismatch');
      if (user) {
        console.log('Stored Token:', user.refreshToken ? `${user.refreshToken.substring(0, 10)}...` : 'None');
        console.log('Tokens Match:', user.refreshToken === token);
      }
      res.status(401).json({ message: 'Invalid refresh token' });
      return;
    }

    const { accessToken } = generateTokens(user.id, user.email);
    console.log('New Access Token generated successfully');

    res.status(200).json({
      message: 'Token refreshed successfully',
      data: { accessToken }
    });
  } catch (error: any) {
    console.log('Refresh Token Error:', error.message || error);
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token is required to logout' });
      return;
    }

    const { refreshSecret } = getJwtSecrets();
    const decoded = jwt.verify(refreshToken, refreshSecret) as { userId: number };

    // Invalidate session by removing token from DB
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { refreshToken: null },
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    // If token is invalid or user doesn't exist, we still treat it as a success for cleanup
    res.status(200).json({ message: 'Logged out successfully' });
  }
};

