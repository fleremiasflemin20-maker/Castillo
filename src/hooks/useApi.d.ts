import { type Task } from '../hooks';
export declare function useTasks(staffId?: string): {
    tasks: any;
    loading: any;
    refreshing: boolean;
    fetchTasks: () => Promise<void>;
    updateTaskStatus: (taskId: string, status: Task["status"]) => Promise<boolean>;
};
export declare function useInventory(): {
    inventory: any;
    loading: any;
    lowStockItems: any;
    fetchInventory: () => Promise<void>;
};
export declare function useDashboard(): {
    stats: any;
    activities: any;
    alerts: any;
    loading: any;
    fetchDashboard: () => Promise<void>;
};
export declare function useAlerts(): {
    alerts: any;
    unreadCount: any;
    markAsRead: (alertId: string) => Promise<void>;
};
