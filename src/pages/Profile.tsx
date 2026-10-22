import { Bell, Moon, Shield, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-8 pt-8">
      <div className="mb-10">
        <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest mb-1">Personal Settings</p>
        <h2 className="font-headline font-bold text-4xl tracking-tight text-on-surface">Staff Profile</h2>
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCglKyE0_KoY17fubyhCJrGJhneLqXYYTO_8wGgAOgU_TKzMSD3658OqFc-7SBEde8HOQrWpcvSxPasOdCIOSbWETZH3lh0gasdjQhYpKPA5cL5c_G8h_ofpda_k87qUGdYElsBtgxDJofYTJJpX2UIEWLgxlQ24rFrFJDFtYgsSwo9TWDhOl4HBBRKN4Pc0O7ubrl3pITZmbyrZstov0RPLuVzJBicNcIn91JqZ_EcrpM81A5_sbVES-whTmQvJ8zmm55mDZwrx4rG"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-headline font-bold text-2xl text-on-surface">Elena Rodriguez</h3>
            <p className="text-on-surface-variant">Floor 4 Specialist</p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-3">
              <div className="flex items-center gap-2">
                <span className="text-primary text-lg font-bold">4.8</span>
                <span className="text-on-surface-variant text-sm">Rating</span>
              </div>
              <div className="w-px h-6 bg-outline-variant/30" />
              <div className="flex items-center gap-2">
                <span className="text-primary text-lg font-bold">342</span>
                <span className="text-on-surface-variant text-sm">Tasks</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-outline-variant/10">
          <h4 className="font-headline font-bold text-on-surface">Preferences</h4>
        </div>
        
        <button 
          onClick={() => setNotifications(!notifications)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface-container-low transition-colors"
        >
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-on-surface-variant" />
            <div>
              <p className="font-semibold text-on-surface">Push Notifications</p>
              <p className="text-sm text-on-surface-variant">Receive task alerts</p>
            </div>
          </div>
          <div className={`w-12 h-7 rounded-full transition-colors relative ${notifications ? 'bg-primary' : 'bg-outline'}`}>
            <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
          </div>
        </button>

        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface-container-low transition-colors"
        >
          <div className="flex items-center gap-4">
            <Moon size={20} className="text-on-surface-variant" />
            <div>
              <p className="font-semibold text-on-surface">Dark Mode</p>
              <p className="text-sm text-on-surface-variant">Toggle dark theme</p>
            </div>
          </div>
          <div className={`w-12 h-7 rounded-full transition-colors relative ${darkMode ? 'bg-primary' : 'bg-outline'}`}>
            <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </div>
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-xl overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-outline-variant/10">
          <h4 className="font-headline font-bold text-on-surface">Account</h4>
        </div>
        
        <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface-container-low transition-colors">
          <div className="flex items-center gap-4">
            <Shield size={20} className="text-on-surface-variant" />
            <p className="font-semibold text-on-surface">Security</p>
          </div>
          <ChevronRight size={20} className="text-on-surface-variant" />
        </button>
      </div>

      <button className="w-full py-4 bg-error-container text-error rounded-xl font-bold">
        Sign Out
      </button>
    </div>
  );
}