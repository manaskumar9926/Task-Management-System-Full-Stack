'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { AlertCircle, Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
}

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, title }: DeleteConfirmModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Delete Task"
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">Are you sure?</h3>
          <p className="text-sm text-slate-500">
            You are about to delete "<span className="font-medium text-slate-700">{title}</span>". 
            This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 w-full mt-6">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            className="flex-1 gap-2" 
            onClick={handleConfirm}
            isLoading={loading}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
