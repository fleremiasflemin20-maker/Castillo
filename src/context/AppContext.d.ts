import { type ReactNode } from 'react';
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
export declare function AppProvider({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
export declare function useApp(): AppContextValue;
export {};
