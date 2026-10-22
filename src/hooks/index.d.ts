export { useAppData } from './useAppData';
export { useTasks, useInventory, useDashboard, useAlerts } from './useApi';
export { fetchApi, REFRESH_INTERVALS } from './api';
export type { Task, Stats, InventoryItem } from './useAppData';
export interface Activity {
    id: string;
    type: string;
    message: string;
    timestamp: string;
}
export interface Alert {
    id: string;
    type: 'info' | 'warning' | 'error';
    message: string;
    read: boolean;
}
