import { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle, Circle, Info, Camera, Pause, Play } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useAppData, type Task } from '../hooks';

interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
  note?: string;
}

const mockChecklist: ChecklistItem[] = [
  { id: '1', text: 'Strip Bed & Remove Linens', done: true },
  { id: '2', text: 'Sanitize High-Touch Surfaces', done: true },
  { id: '3', text: 'Vacuum Carpets & Area Rugs', done: false, note: 'Use HEPA filter attachment for room 300+ series.' },
  { id: '4', text: 'Replenish Minibar & Toiletries', done: false },
  { id: '5', text: 'Final Visual Inspection (The Signature)', done: false },
];

export default function TaskDetail() {
  const { id } = useParams();
  const { tasks } = useAppData();
  const task = tasks.find(t => t.id === id) || tasks[0];
  const [checklist, setChecklist] = useState(mockChecklist);
  const [elapsed, setElapsed] = useState('18:24');
  const [isPaused, setIsPaused] = useState(false);

  const doneCount = checklist.filter(i => i.done).length;
  const progress = Math.round((doneCount / checklist.length) * 100);

  const toggleItem = (itemId: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === itemId ? { ...item, done: !item.done } : item
    ));
  };

  return (
    <div className="max-w-screen-xl mx-auto px-8 pb-32 pt-6">
      <header className="w-full sticky top-0 z-50 bg-surface/80 backdrop-blur-md flex justify-between items-center px-8 py-4 -mx-8 -mt-6 mb-6">
        <div className="flex items-center gap-4">
          <button className="hover:bg-surface-container transition-colors p-2 rounded-full active:scale-95 duration-200 text-primary">
            <ArrowLeft size={20} />
          </button>
          <span className="font-headline font-extrabold text-primary tracking-wider text-lg">TurnoverTrack</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full">
            {task.status === 'in-progress' ? 'In Progress' : task.status}
          </span>
        </div>
      </header>

      <section className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-headline font-extrabold text-5xl tracking-tight text-on-surface mb-2">Room {task.roomNumber}</h1>
            <p className="font-label text-on-surface-variant uppercase tracking-[0.2em] font-medium text-sm">{task.type}</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface-container-low px-6 py-4 rounded-xl flex items-center gap-4">
              <Clock className="text-primary" size={20} />
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Estimated Time</p>
                <p className="font-headline font-bold text-lg text-on-surface">{task.estimatedTime}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-headline font-bold text-2xl tracking-tight">Cleaning Checklist</h2>
              <span className="font-label text-xs font-semibold text-primary bg-primary-container px-3 py-1 rounded-full">{doneCount}/{checklist.length} Done</span>
            </div>
            
            <div className="w-full bg-primary-container h-1 rounded-full mb-10 overflow-hidden">
              <div className="bg-primary h-full" style={{ width: `${progress}%` }}></div>
            </div>
            
            <div className="space-y-4">
              {checklist.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => toggleItem(item.id)}
                  className={`flex items-center gap-6 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                    item.done 
                      ? 'bg-surface-container-low' 
                      : item.text.includes('Vacuum')
                        ? 'bg-surface-container-lowest border border-primary/20 shadow-sm'
                        : 'hover:bg-surface-container-low'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.done 
                      ? 'bg-primary text-on-primary' 
                      : 'border-2 border-outline-variant/50 text-outline-variant'
                  }`}>
                    {item.done ? (
                      <CheckCircle size={20} />
                    ) : (
                      <Circle size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className={`font-body font-semibold text-on-surface ${item.done ? 'line-through opacity-50' : ''}`}>{item.text}</span>
                    {item.note && !item.done && (
                      <p className="text-xs text-on-surface-variant mt-0.5">{item.note}</p>
                    )}
                  </div>
                  {!item.done && <Info size={16} className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-8">
            <h2 className="font-headline font-bold text-2xl tracking-tight mb-6">Visual Verification</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group aspect-video rounded-xl overflow-hidden bg-surface-container-highest border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 transition-all">
                <div className="absolute inset-0 bg-surface-container mix-blend-multiply" />
                <div className="relative z-10 flex flex-col items-center text-center px-4">
                  <Camera className="text-3xl mb-2 text-on-surface" size={32} />
                  <span className="font-label text-xs uppercase font-extrabold tracking-widest text-on-surface">Before Check-In</span>
                  <span className="text-[10px] text-on-surface-variant mt-1">Uploaded at 10:14 AM</span>
                </div>
              </div>
              <div className="aspect-video rounded-xl bg-surface-container-lowest border-2 border-dashed border-primary/20 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 transition-all">
                <Camera className="text-4xl text-primary mb-3" size={36} />
                <span className="font-label text-xs uppercase font-extrabold tracking-[0.2em] text-primary">Upload After Photo</span>
                <p className="text-[10px] text-on-surface-variant mt-2">Required for task completion</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-secondary-container text-on-secondary-container rounded-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-on-secondary-container">priority_high</span>
              <h3 className="font-headline font-bold text-lg">Manager's Notes</h3>
            </div>
            <p className="font-body text-sm leading-relaxed mb-6">
              "Guest requested extra hypo-allergenic pillows. Please ensure all AC vents are dusted. This room is priority for an early check-in at 2:00 PM."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-on-secondary-container/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">account_circle</span>
              </div>
              <div>
                <p className="text-xs font-bold">Sarah Williams</p>
                <p className="text-[10px] opacity-70">Floor Supervisor</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15">
            <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-on-surface-variant mb-6">Room Configuration</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                <span className="text-sm font-medium">Bed Type</span>
                <span className="text-sm font-bold">King Luxury</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                <span className="text-sm font-medium">Bathroom</span>
                <span className="text-sm font-bold">Full Suite + Spa</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                <span className="text-sm font-medium">Pet Friendly</span>
                <span className="text-xs font-bold uppercase tracking-tighter px-2 py-0.5 bg-error-container text-on-error-container rounded">No</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-medium">Balcony</span>
                <span className="text-sm font-bold">Ocean View</span>
              </div>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low transition-all active:scale-[0.98]">
            <span className="material-symbols-outlined text-lg">support_agent</span>
            <span className="font-label text-xs uppercase font-bold tracking-widest">Request Assistance</span>
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-50 px-8 pb-8 flex justify-center">
        <div className="w-full max-w-4xl bg-surface-container-lowest/80 backdrop-blur-xl rounded-2xl shadow-[0px_8px_32px_rgba(45,52,50,0.12)] border border-outline-variant/10 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-6 px-4 border-r border-outline-variant/20">
            <div>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-extrabold">Total Elapsed</p>
              <p className="font-headline font-bold text-xl text-on-surface">{elapsed}</p>
            </div>
            <div className="h-8 w-[1px] bg-outline-variant/20 mx-2"></div>
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className="flex flex-col items-center text-error group"
            >
              {isPaused ? <Play size={20} className="group-hover:scale-110 transition-transform" /> : <Pause size={20} className="group-hover:scale-110 transition-transform" />}
              <span className="text-[9px] uppercase font-bold tracking-tighter">{isPaused ? 'Play' : 'Pause'}</span>
            </button>
          </div>
          <div className="flex-1 flex justify-end w-full md:w-auto">
            <button className="w-full md:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-dim text-on-primary font-headline font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all">
              <span>Finish & Mark Ready</span>
              <span className="material-symbols-outlined">verified</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}