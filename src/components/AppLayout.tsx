import type { ReactNode } from 'react';
import { Bell, Home, CheckSquare, BarChart3, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface pb-24">
      <header className="w-full sticky top-0 z-50 bg-surface flex justify-between items-center px-8 py-4 border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden">
            <img src="https://via.placeholder.com/40" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-headline font-extrabold text-primary tracking-wider text-lg">TurnoverTrack</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-surface-container text-primary">
          <Bell size={20} />
        </button>
      </header>
      
      <main className="max-w-7xl mx-auto px-8 pt-8">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-surface-container-lowest rounded-t-xl">
        <NavLink to="/" className={({ isActive }) => `flex flex-col items-center px-6 py-2 ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
          <Home size={20} />
          <span className="text-[10px] uppercase mt-1">Home</span>
        </NavLink>
        
        <NavLink to="/tasks" className={({ isActive }) => `flex flex-col items-center px-6 py-2 ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
          <CheckSquare size={20} />
          <span className="text-[10px] uppercase mt-1">Tasks</span>
        </NavLink>
        
        <NavLink to="/reports" className={({ isActive }) => `flex flex-col items-center px-6 py-2 ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
          <BarChart3 size={20} />
          <span className="text-[10px] uppercase mt-1">Reports</span>
        </NavLink>
        
        <NavLink to="/profile" className={({ isActive }) => `flex flex-col items-center px-6 py-2 ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
          <User size={20} />
          <span className="text-[10px] uppercase mt-1">Profile</span>
        </NavLink>
      </nav>
    </div>
  );
}