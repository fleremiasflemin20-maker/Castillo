import { useState } from 'react';
import { Search, CheckCircle, Clock, Circle } from 'lucide-react';
import { useAppData, type Task } from '../hooks';

export default function Tasks() {
  const { tasks } = useAppData();
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [location, setLocation] = useState('all');
  const [search, setSearch] = useState('');

  const filteredTasks = tasks.filter(task => {
    if (filter !== 'all' && task.status !== filter) return false;
    if (location !== 'all' && !task.roomNumber.includes(location)) return false;
    if (search && !task.roomNumber.toLowerCase().includes(search.toLowerCase()) && !task.type.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const completionRate = Math.round((completedCount / tasks.length) * 100);

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-primary" size={20} />;
      case 'in-progress': return <Clock className="text-tertiary" size={20} />;
      case 'pending': return <Pending className="text-on-surface-variant" size={20} />;
    }
  };

  const getStatusBadge = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'bg-tertiary-container text-on-tertiary-container';
      case 'in-progress': return 'bg-tertiary-container/60 text-tertiary';
      case 'pending': return 'bg-surface-container text-on-surface-variant';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 pt-8">
      <div className="mb-10">
        <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest mb-1">Operations Overview</p>
        <h2 className="font-headline font-bold text-4xl tracking-tight text-on-surface">Daily Assignments</h2>
      </div>

      <section className="mb-12 flex flex-col md:flex-row gap-6 items-end">
        <div className="w-full md:w-auto">
          <label className="block font-label text-xs text-on-surface-variant mb-2 ml-1">Status</label>
          <div className="flex bg-surface-container-high p-1 rounded-xl gap-1">
            {(['all', 'pending', 'in-progress', 'completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
                  filter === status 
                    ? 'bg-surface-container-lowest shadow-sm text-primary' 
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {status === 'all' ? 'All' : status === 'in-progress' ? 'Active' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-64">
          <label className="block font-label text-xs text-on-surface-variant mb-2 ml-1">Location</label>
          <div className="relative">
            <select 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full appearance-none bg-surface-container-high border-b-2 border-outline focus:border-primary focus:ring-0 px-4 py-3 pr-10 rounded-t-xl text-on-surface font-medium"
            >
              <option value="all">All Buildings</option>
              <option value="4">West Wing - Floor 2</option>
              <option value="5">East Tower - Floor 4</option>
              <option value="Suite">Penthouse Level</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">keyboard_arrow_down</span>
          </div>
        </div>

        <div className="flex-grow">
          <label className="block font-label text-xs text-on-surface-variant mb-2 ml-1">Quick Search</label>
          <div className="relative">
            <input 
              className="w-full bg-surface-container-high border-b-2 border-outline focus:border-primary focus:ring-0 px-4 py-3 pl-12 rounded-t-xl text-on-surface font-medium"
              placeholder="Search room or staff..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {filteredTasks.map((task) => (
          <div key={task.id} className={`md:col-span-4 bg-surface-container-lowest rounded-xl p-6 border-l-4 shadow-[0px_0px_24px_rgba(45,52,50,0.04)] hover:translate-y-[-2px] transition-transform ${
            task.status === 'completed' ? 'border-tertiary' : task.priority === 'high' ? 'border-primary' : 'border-secondary/20'
          }`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Room {task.roomNumber}</span>
                {task.priority === 'high' && (
                  <span className="text-tertiary font-medium text-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">priority_high</span> High Priority
                  </span>
                )}
              </div>
              {getStatusIcon(task.status)}
            </div>
            <h3 className="font-headline font-bold text-lg text-on-surface mb-1">{task.type}</h3>
            <p className="text-on-surface-variant text-xs mb-4">{task.assignedTo}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container">
                  <img alt="Staff" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSKc4qOzFfduINFjlvunQCa0rXs0LCSpor0w5hLxdTImPFCPX6yLS0LaKHgFvFzv-pSKKTjwXAtAnjx36hODfzaJxWBxi3DMwlf6v8hvtL7QF1Ww9Otg71awfK6eWN1SZAREFr48YRmeRB5TFVvTP9OXCpJY_HdDDn-_bj9mwIbWiMb3FaCWMdpKAD57ScrRG4vZcZZSPopOkQ6zxbBRL7r4QE-eeCLVvoFXXgIVsGGaDaXPA0PFIFMdHzb7W0UVXhiaXJt1DoV1K3" />
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusBadge(task.status)}`}>
                {task.status === 'in-progress' ? 'In Progress' : task.status}
              </span>
            </div>
          </div>
        ))}

        <div className="md:col-span-4 bg-primary text-on-primary rounded-xl p-8 flex flex-col justify-between overflow-hidden relative">
          <div className="relative z-10">
            <p className="font-label text-xs uppercase tracking-[0.2em] opacity-80 mb-6">Completion Rate</p>
            <p className="font-headline font-extrabold text-6xl tracking-tight mb-2">{completionRate}%</p>
            <p className="text-on-primary/80 text-sm">{completedCount} of {tasks.length} rooms cleared for occupancy today.</p>
          </div>
          <div className="mt-8 relative z-10">
            <div className="h-1 bg-on-primary/20 rounded-full w-full mb-2">
              <div className="h-full bg-primary-container rounded-full" style={{ width: `${completionRate}%` }}></div>
            </div>
          </div>
          <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[12rem] opacity-10 pointer-events-none">check_circle</span>
        </div>
      </div>
    </div>
  );
}