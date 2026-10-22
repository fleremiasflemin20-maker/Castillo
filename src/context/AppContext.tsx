import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Task, InventoryItem, Stats, Activity, Alert } from '../hooks';

interface AppState {
  tasks: Task[];
  inventory: InventoryItem[];
  activities: Activity[];
  alerts: Alert[];
  stats: Stats;
  loading: boolean;
  error: string | null;
}

interface AppContextValue {
  state: AppState;
  setTasks: (tasks: Task[]) => void;
  updateTask: (task: Task) => void;
  setInventory: (inventory: InventoryItem[]) => void;
  setActivities: (activities: Activity[]) => void;
  setAlerts: (alerts: Alert[]) => void;
  setStats: (stats: Stats) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  markAlertRead: (alertId: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const mockAlerts: Alert[] = [
  { id: '1', type: 'info', message: 'Suite 501 requires deep cleaning', read: false },
  { id: '2', type: 'warning', message: 'Low stock: Standard Pillows', read: true },
];

const mockStats: Stats = {
  tasksToday: 24,
  tasksCompleted: 16,
  tasksInProgress: 8,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [stats, setStats] = useState<Stats>(mockStats);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTask = useCallback((updated: Task) => {
    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
  }, []);

  const markAlertRead = useCallback((alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, read: true } : a));
  }, []);

  const value: AppContextValue = {
    state: { tasks, inventory, activities, alerts, stats, loading, error },
    setTasks,
    updateTask,
    setInventory,
    setActivities,
    setAlerts,
    setStats,
    setLoading,
    setError,
    markAlertRead,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}