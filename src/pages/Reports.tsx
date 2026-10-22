import { Star, Clock, CheckCircle, BarChart3 } from 'lucide-react';

export default function Reports() {
  return (
    <div className="max-w-7xl mx-auto px-8 pt-8">
      <div className="mb-10">
        <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest mb-1">Performance Analytics</p>
        <h2 className="font-headline font-bold text-4xl tracking-tight text-on-surface">Performance Reports</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface-container-lowest p-6 rounded-xl">
          <CheckCircle size={24} className="text-primary opacity-20 mb-2" />
          <p className="text-on-surface-variant text-xs uppercase tracking-wider mb-1">Tasks Completed</p>
          <p className="font-headline font-extrabold text-2xl text-on-surface">142</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl">
          <Clock size={24} className="text-secondary opacity-20 mb-2" />
          <p className="text-on-surface-variant text-xs uppercase tracking-wider mb-1">Avg Response Time</p>
          <p className="font-headline font-extrabold text-2xl text-on-surface">18m</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl">
          <Star size={24} className="text-tertiary opacity-20 mb-2" />
          <p className="text-on-surface-variant text-xs uppercase tracking-wider mb-1">Quality Score</p>
          <p className="font-headline font-extrabold text-2xl text-on-surface">98.2</p>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl">
          <BarChart3 size={24} className="text-primary opacity-20 mb-2" />
          <p className="text-on-surface-variant text-xs uppercase tracking-wider mb-1">Guest Satisfaction</p>
          <p className="font-headline font-extrabold text-2xl text-on-surface">4.8/5</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-8">
        <h3 className="font-headline font-bold text-2xl tracking-tight mb-6">This Week's Performance</h3>
        <div className="space-y-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
            <div key={day} className="flex items-center gap-4">
              <span className="text-sm text-on-surface-variant w-12">{day}</span>
              <div className="flex-grow h-2 bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${65 + Math.random() * 35}%` }} />
              </div>
              <span className="text-sm font-bold text-on-surface w-12 text-right">{65 + Math.floor(Math.random() * 35)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}