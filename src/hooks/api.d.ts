export declare const REFRESH_INTERVALS: {
    TASKS: number;
    INVENTORY: number;
    DASHBOARD: number;
    ALERTS: number;
};
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
export declare function fetchApi<T>(endpoint: string, method?: string, body?: unknown): Promise<ApiResponse<T>>;
