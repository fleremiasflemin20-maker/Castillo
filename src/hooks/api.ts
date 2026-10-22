export const REFRESH_INTERVALS = {
  TASKS: 30000,
  INVENTORY: 60000,
  DASHBOARD: 30000,
  ALERTS: 30000,
};

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function request<T>(endpoint: string, method = 'GET', body?: unknown): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await response.json();
    return { success: response.ok, data, error: !response.ok ? data.error : undefined };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Network error' };
  }
}

export async function fetchApi<T>(endpoint: string, method = 'GET', body?: unknown): Promise<ApiResponse<T>> {
  return request<T>(endpoint, method, body);
}