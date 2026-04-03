'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  ClipboardList
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import TaskCard from '@/components/task/TaskCard';
import TaskModal from '@/components/task/TaskModal';
import DeleteConfirmModal from '@/components/task/DeleteConfirmModal';
import { useTasks, Task } from '@/hooks/useTasks';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const {
    tasks,
    loading,
    totalPages,
    createTask,
    updateTask,
    deleteTask,
    toggleTask
  } = useTasks({ search, filter, page });

  const handleCreateOrUpdate = async (formData: { title: string; description: string }) => {
    if (editingTask) {
      await updateTask(editingTask.id, formData);
    } else {
      await createTask(formData);
    }
  };

  const openDeleteModal = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 font-bold" />
          <input
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all hover:bg-white"
            placeholder="Search tasks by title or description..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative inline-block w-full sm:w-40">
            <select
              className="w-full appearance-none px-4 py-2.5 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer hover:bg-white pr-10"
              value={filter}
              onChange={(e) => { setFilter(e.target.value as any); setPage(1); }}
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <Button 
            className="gap-2 shrink-0 py-2.5 rounded-xl whitespace-nowrap" 
            onClick={() => { setEditingTask(null); setIsModalOpen(true); }}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Task</span>
          </Button>
        </div>
      </div>

      <div className="relative min-h-[400px]">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-44 rounded-xl bg-slate-200 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : tasks.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {tasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggle={toggleTask}
                  onEdit={(t) => { setEditingTask(t); setIsModalOpen(true); }}
                  onDelete={() => openDeleteModal(task)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200"
          >
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <ClipboardList className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No tasks found</h3>
            <p className="text-slate-500 mt-1 max-w-[200px]">
              Looks like your task list is clear. Great job!
            </p>
            <Button variant="outline" className="mt-6" onClick={() => setIsModalOpen(true)}>
              Add your first task
            </Button>
          </motion.div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-8">
          <Button 
            variant="outline" 
            size="sm" 
            disabled={page === 1} 
            onClick={() => setPage(p => p - 1)}
            className="rounded-lg px-2"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="text-sm font-medium text-slate-600">
            Page {page} of {totalPages}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            disabled={page === totalPages} 
            onClick={() => setPage(p => p + 1)}
            className="rounded-lg px-2"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdate}
        task={editingTask}
      />

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={async () => {
          if (taskToDelete) await deleteTask(taskToDelete.id);
        }}
        title={taskToDelete?.title || ''}
      />
    </div>
  );
}
