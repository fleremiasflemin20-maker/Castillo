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
export declare function useAppData(): {
    tasks: Task[];
    stats: Stats;
    inventory: {
        id: string;
        name: string;
        category: string;
        stock: number;
        status: string;
    }[];
};
