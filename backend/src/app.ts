import express from 'express';
import cors from 'cors';
import authRoutes from './auth/auth.routes';
import taskRoutes from './tasks/task.routes';

const app = express();

app.use(cors({
  origin: '*', // Allow all origins for development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Task Management API is running',
    data: {
      status: 'healthy',
      uptime: `${Math.floor(process.uptime())}s`,
      timestamp: new Date().toISOString()
    }
  });
});


export default app;
