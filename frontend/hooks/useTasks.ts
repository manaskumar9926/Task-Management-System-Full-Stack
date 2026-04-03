'use client';

import { useState, useCallback, useEffect } from 'react';
import api from '@/lib/axios';
import { toast } from 'sonner';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
}

interface UseTasksProps {
  search: string;
  filter: 'all' | 'completed' | 'pending';
  page: number;
}

export function useTasks({ search, filter, page }: UseTasksProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const completedParam = filter === 'all' ? '' : filter === 'completed' ? 'true' : 'false';
      const { data } = await api.get('/tasks', {
        params: {
          search,
          completed: completedParam,
          page,
          limit: 6
        }
      });
      setTasks(data.data);
      setTotalPages(Math.ceil(data.total / 6));
    } catch (error: any) {
      toast.error('Error ✔');
    } finally {
      setLoading(false);
    }
  }, [search, filter, page]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchTasks();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [fetchTasks]);

  const createTask = async (data: { title: string; description: string }) => {
    const response = await api.post('/tasks', data);
    toast.success('Task created ✔');
    fetchTasks();
    return response.data;
  };

  const updateTask = async (id: number, data: { title: string; description: string }) => {
    const response = await api.patch(`/tasks/${id}`, data);
    toast.success('Task updated ✔');
    fetchTasks();
    return response.data;
  };

  const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    toast.success('Deleted ✔');
    fetchTasks();
  };

  const toggleTask = async (id: number) => {
    try {
      await api.patch(`/tasks/${id}/toggle`);
      setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    } catch (error) {
      toast.error('Error ✔');
    }
  };

  return {
    tasks,
    loading,
    totalPages,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask
  };
}
