import { Request, Response } from 'express';
import prisma from '../prisma/prisma';

const getParam = (param: any): string => {
  if (Array.isArray(param)) return String(param[0]);
  return String(param || '');
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    const page = Math.max(1, parseInt(getParam(req.query.page)) || 1);
    const limit = Math.max(1, parseInt(getParam(req.query.limit)) || 10);
    const search = getParam(req.query.search).trim();
    const completedFilter = getParam(req.query.completed).trim(); // 'true' or 'false'

    const skip = (page - 1) * limit;

    const whereClause: any = { userId };

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (completedFilter) {
      whereClause.completed = completedFilter === 'true';
    }

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.task.count({ where: whereClause })
    ]);

    res.status(200).json({
      message: 'Tasks retrieved successfully',
      data: tasks,
      total,
      page,
      limit,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { title, description } = req.body;

    if (!title || String(title).trim() === "") {
      res.status(400).json({ message: 'Task title is required' });
      return;
    }

    const task = await prisma.task.create({
      data: {
        title: String(title).trim(),
        description: description ? String(description).trim() : null,
        userId,
      },
    });

    res.status(201).json({
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const taskId = parseInt(getParam(req.params.id));
    const { title, description, completed } = req.body;

    if (!taskId) {
      res.status(400).json({ message: 'Valid task ID is required' });
      return;
    }

    const existingTask = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!existingTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(title !== undefined && { title: String(title).trim() }),
        ...(description !== undefined && { description: description ? String(description).trim() : null }),
        ...(completed !== undefined && { completed: Boolean(completed) }),
      },
    });

    res.status(200).json({
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const taskId = parseInt(getParam(req.params.id));

    if (!taskId) {
      res.status(400).json({ message: 'Valid task ID is required' });
      return;
    }

    const existingTask = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!existingTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    await prisma.task.delete({ where: { id: taskId } });
    res.status(200).json({ message: 'Task deleted successfully', data: null as null });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const toggleTaskStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const taskId = parseInt(getParam(req.params.id));

    if (!taskId) {
      res.status(400).json({ message: 'Valid task ID is required' });
      return;
    }

    const existingTask = await prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!existingTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data: { completed: !existingTask.completed },
    });

    res.status(200).json({
      message: 'Task status toggled successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


