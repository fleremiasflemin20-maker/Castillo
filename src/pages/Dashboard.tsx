import { CheckCircle, Clock, Star, ClipboardList, AlertTriangle } from 'lucide-react';
import { useAppData } from '../hooks';

export default function Dashboard() {
  const { tasks, stats } = useAppData();
  const pendingTasks = tasks.filter(t => t.status === 'pending' || t.status === 'in-progress');
  const completionRate = Math.round((stats.tasksCompleted / stats.tasksToday) * 100);

  return (
    <div className="max-w-7xl mx-auto px-8 pt-8">
      <div className="mb-10">
        <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest mb-1">Operations Overview</p>
        <h2 className="font-headline font-bold text-4xl tracking-tight text-on-surface">Daily Assignments</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-surface-container-lowest p-6 rounded-xl">
          <ClipboardList size={40} className="text-primary opacity-20 mb-2" />
          <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Tasks Today</p>
          <p className="font-headline font-extrabold text-5xl text-primary">{stats.tasksToday}</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl">
          <CheckCircle size={40} className="text-tertiary opacity-20 mb-2" />
          <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Completed</p>
          <p className="font-headline font-extrabold text-5xl text-tertiary">{stats.tasksCompleted}</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl">
          <Clock size={40} className="text-secondary opacity-20 mb-2" />
          <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">In Progress</p>
          <p className="font-headline font-extrabold text-5xl text-secondary">{stats.tasksInProgress}</p>
        </div>
      </div>

      <div className="bg-primary text-on-primary rounded-xl p-8">
        <p className="font-label text-xs uppercase tracking-[0.2em] opacity-80 mb-6">Completion Rate</p>
        <p className="font-headline font-extrabold text-6xl tracking-tight mb-2">{completionRate}%</p>
        <p className="text-on-primary opacity-80 text-sm">{stats.tasksCompleted} of {stats.tasksToday} rooms cleared today.</p>
        <div className="mt-8 h-1 bg-on-primary opacity-20 rounded-full">
          <div className="h-full bg-primary-container rounded-full" style={{ width: `${completionRate}%` }}></div>
        </div>
      </div>

      <h3 className="font-headline font-bold text-xl text-on-surface mt-10 mb-4">Priority Turnover</h3>
      <div className="space-y-4">
        {pendingTasks.slice(0, 3).map((task) => (
          <div key={task.id} className={`bg-surface-container-lowest p-6 rounded-xl flex flex-col md:flex-row justify-between items-start gap-6 border-l-4 ${
            task.status === 'in-progress' ? 'border-tertiary' : 'border-primary'
          }`}>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold uppercase">Room {task.roomNumber}</span>
                {task.priority === 'high' && (
                  <span className="text-tertiary font-medium text-sm flex items-center gap-1">
                    <AlertTriangle size={14} /> High Priority
                  </span>
                )}
              </div>
              <h4 className="font-headline font-bold text-xl text-on-surface mb-1">{task.type}</h4>
              <p className="text-on-surface-variant text-sm">{task.assignedTo}</p>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <div className="text-right">
                <p className="text-xs text-on-surface-variant uppercase">Est. Duration</p>
                <p className="font-bold">{task.estimatedTime}</p>
              </div>
              <button className="w-full md:w-auto bg-gradient-to-r from-primary to-primary-dim text-on-primary px-6 py-3 rounded-xl font-bold text-sm">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}