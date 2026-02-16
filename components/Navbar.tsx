
import React from 'react';
import { User, AppView } from '../types';

interface NavbarProps {
  user: User;
  currentView: AppView;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, currentView, onLogout }) => {
  const isAdmin = currentView === AppView.ADMIN_DASHBOARD;

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-yellow-500 font-mono-bold text-2xl leading-none tracking-tighter">THE PIT</span>
            <span className="text-[9px] text-slate-500 uppercase tracking-[0.4em] mt-1">Operational Station</span>
          </div>
          <div className={`px-4 py-1.5 rounded-full border text-[9px] font-bold uppercase tracking-widest transition-all ${isAdmin ? 'bg-red-500/10 border-red-500/30 text-red-400 shadow-lg shadow-red-500/5' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'}`}>
            <span className="mr-2 inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
            {isAdmin ? 'Admin Override Active' : 'Player Session'}
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white tracking-tight">{user.name}</p>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest">Active Operative</p>
          </div>
          <button
            onClick={onLogout}
            className="group flex items-center gap-2 bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-400 border border-slate-700 px-6 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
          >
            <span>Disconnect</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
