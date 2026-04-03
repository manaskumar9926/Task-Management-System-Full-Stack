'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Edit2, 
  Trash2,
  MoreVertical
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { format } from 'date-fns';
import { cn } from '@/components/ui/Button';

interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={cn(
        "group relative flex flex-col gap-4 rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md",
        task.completed ? "border-emerald-100 bg-emerald-50/10" : "border-slate-200"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <button 
          onClick={() => onToggle(task.id)}
          className={cn(
            "mt-1 shrink-0 transition-colors",
            task.completed ? "text-emerald-500" : "text-slate-300 hover:text-slate-400"
          )}
        >
          {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "text-lg font-semibold truncate transition-all",
            task.completed ? "text-slate-500 line-through decoration-slate-400" : "text-slate-900"
          )}>
            {task.title}
          </h3>
          {task.description && (
            <p className={cn(
              "mt-1 text-sm line-clamp-2",
              task.completed ? "text-slate-400" : "text-slate-600"
            )}>
              {task.description}
            </p>
          )}
        </div>

        <div className="flex items-start gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(task)}
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <Calendar className="w-3 h-3" />
          {format(new Date(task.createdAt), 'MMM dd, yyyy')}
        </div>
        <Badge variant={task.completed ? 'success' : 'neutral'}>
          {task.completed ? 'Completed' : 'Pending'}
        </Badge>
      </div>
    </motion.div>
  );
}
