import { useState } from 'react';

export interface Task {
  id: string;
  roomNumber: string;
  type: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  estimatedTime: string;
}

export interface Stats {
  tasksToday: number;
  tasksCompleted: number;
  tasksInProgress: number;
}

const mockTasks: Task[] = [
  { id: '1', roomNumber: '402', type: 'Deep Clean & Sanitization', status: 'pending', priority: 'high', assignedTo: 'Elena Rodriguez', estimatedTime: '1h 45m' },
  { id: '2', roomNumber: '115', type: 'Standard Checkout', status: 'in-progress', priority: 'medium', assignedTo: 'Marcus Chen', estimatedTime: '45m' },
  { id: '3', roomNumber: '308', type: 'Quality Verification', status: 'completed', priority: 'low', assignedTo: 'Sarah Jenkins', estimatedTime: '30m' },
  { id: '4', roomNumber: 'Suite 501', type: 'Morning Service', status: 'completed', priority: 'medium', assignedTo: 'Sarah Jenkins', estimatedTime: '1h' },
  { id: '5', roomNumber: '112', type: 'Standard Checkout', status: 'pending', priority: 'low', assignedTo: 'Marcus Chen', estimatedTime: '40m' },
  { id: '6', roomNumber: '205', type: 'Pet-Friendly Refresh', status: 'in-progress', priority: 'medium', assignedTo: 'Elena Rodriguez', estimatedTime: '1h 15m' },
];

const mockStats: Stats = {
  tasksToday: 24,
  tasksCompleted: 16,
  tasksInProgress: 8,
};

const mockInventory = [
  { id: '1', name: 'All-Purpose Cleaner', category: 'Cleaning', stock: 12, status: 'optimal' },
  { id: '2', name: 'Standard Pillows', category: 'Linens', stock: 4, status: 'critical' },
  { id: '3', name: 'Body Wash 30ml', category: 'Amenities', stock: 45, status: 'low' },
];

export function useAppData() {
  const [tasks] = useState<Task[]>(mockTasks);
  const [stats] = useState<Stats>(mockStats);
  const [inventory] = useState(mockInventory);

  return { tasks, stats, inventory };
}