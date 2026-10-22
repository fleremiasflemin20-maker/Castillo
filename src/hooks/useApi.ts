import { useState, useEffect, useCallback } from 'react';
import { useAppData, type Task, type Stats } from '../hooks';
import { REFRESH_INTERVALS, fetchApi } from './api';

export function useTasks(staffId?: string) {
  const { state, setTasks, updateTask, setLoading, setError } = useAppData();
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setRefreshing(true);
      const response = staffId
        ? await fetchApi(`/tasks?staffId=${staffId}`)
        : await fetchApi('/tasks');
      
      if (response.success && response.data) {
        setTasks(response.data);
      } else {
        setError(response.error || 'Failed to fetch tasks');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setRefreshing(false);
    }
  }, [staffId, setTasks, setError]);

  const updateTaskStatus = useCallback(async (taskId: string, status: Task['status']) => {
    try {
      const response = await fetchApi(`/tasks/${taskId}`, 'PATCH', { status });
      if (response.success && response.data) {
        updateTask(response.data);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [updateTask]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    const interval = setInterval(fetchTasks, REFRESH_INTERVALS.TASKS);
    return () => clearInterval(interval);
  }, [fetchTasks]);

  return {
    tasks: state.tasks,
    loading: state.loading,
    refreshing,
    fetchTasks,
    updateTaskStatus,
  };
}

export function useInventory() {
  const { state, setInventory, setLoading, setError } = useAppData();

  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchApi('/inventory');
      if (response.success && response.data) {
        setInventory(response.data);
      } else {
        setError(response.error || 'Failed to fetch inventory');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch inventory');
    } finally {
      setLoading(false);
    }
  }, [setInventory, setLoading, setError]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  useEffect(() => {
    const interval = setInterval(fetchInventory, REFRESH_INTERVALS.INVENTORY);
    return () => clearInterval(interval);
  }, [fetchInventory]);

  return {
    inventory: state.inventory,
    loading: state.loading,
    lowStockItems: state.inventory.filter(i => i.status === 'critical' || i.status === 'low'),
    fetchInventory,
  };
}

export function useDashboard() {
  const { state, setActivities, setStats, setAlerts, setLoading, setError } = useAppData();

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const [dashboardRes, activitiesRes, alertsRes] = await Promise.all([
        fetchApi('/dashboard'),
        fetchApi('/activities?limit=10'),
        fetchApi('/alerts'),
      ]);

      if (dashboardRes.success && dashboardRes.data) {
        setStats(dashboardRes.data);
      }
      if (activitiesRes.success && activitiesRes.data) {
        setActivities(activitiesRes.data);
      }
      if (alertsRes.success && alertsRes.data) {
        setAlerts(alertsRes.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard');
    } finally {
      setLoading(false);
    }
  }, [setActivities, setStats, setAlerts, setLoading, setError]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  useEffect(() => {
    const interval = setInterval(fetchDashboard, REFRESH_INTERVALS.DASHBOARD);
    return () => clearInterval(interval);
  }, [fetchDashboard]);

  return {
    stats: state.stats,
    activities: state.activities,
    alerts: state.alerts.filter(a => !a.read),
    loading: state.loading,
    fetchDashboard,
  };
}

export function useAlerts() {
  const { state, setAlerts, markAlertRead } = useAppData();

  const fetchAlerts = useCallback(async () => {
    const response = await fetchApi('/alerts');
    if (response.success && response.data) {
      setAlerts(response.data);
    }
  }, [setAlerts]);

  const markAsRead = useCallback(async (alertId: string) => {
    const response = await fetchApi(`/alerts/${alertId}`, 'PATCH', { read: true });
    if (response.success) {
      markAlertRead(alertId);
    }
  }, [markAlertRead]);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, REFRESH_INTERVALS.ALERTS);
    return () => clearInterval(interval);
  }, [fetchAlerts]);

  return {
    alerts: state.alerts,
    unreadCount: state.alerts.filter(a => !a.read).length,
    markAsRead,
  };
}