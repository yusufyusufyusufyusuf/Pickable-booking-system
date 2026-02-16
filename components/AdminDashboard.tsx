
import React, { useMemo } from 'react';
import { Booking } from '../types';

interface AdminDashboardProps {
  bookings: Booking[];
  onCancel: (id: string) => void;
  onClearAll: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ bookings, onCancel, onClearAll }) => {
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return {
      total: bookings.length,
      today: bookings.filter(b => b.date === today).length,
      skillMix: bookings.reduce((acc, b) => {
        acc[b.skillLevel] = (acc[b.skillLevel] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  }, [bookings]);

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-6 duration-500 pb-24">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center text-slate-900">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
             </div>
             <h2 className="text-4xl md:text-5xl font-mono-bold text-white tracking-tighter">WARDEN'S_HUB</h2>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.4em]">Central Command // [ THE_PIT ]</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={onClearAll}
             className="bg-red-900/40 hover:bg-red-600 text-red-200 font-bold py-3 px-8 rounded-2xl border border-red-500/20 text-xs uppercase tracking-widest transition-all shadow-lg"
           >
             Purge Records
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem] flex flex-col items-center text-center shadow-xl">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em] mb-4">Historical Logs</p>
          <p className="text-7xl font-mono-bold text-yellow-500">{stats.total}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem] flex flex-col items-center text-center shadow-xl">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em] mb-4">Active Operations</p>
          <p className="text-7xl font-mono-bold text-blue-400">{stats.today}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem] flex flex-col items-center text-center shadow-xl overflow-hidden relative">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.4em] mb-6">Skill Distribution</p>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(stats.skillMix).map(([level, count]) => (
              <div key={level} className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-2">
                <span className="text-[9px] font-bold text-slate-400 uppercase">{level}</span>
                <span className="text-xs font-mono-bold text-yellow-500">{count}</span>
              </div>
            ))}
            {Object.keys(stats.skillMix).length === 0 && <span className="text-slate-700 italic text-xs">Waiting for data...</span>}
          </div>
        </div>
      </div>

      <section className="bg-slate-900 border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="p-10 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
           <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">Real-Time Operational Logs</h3>
           <span className="bg-green-500/10 text-green-500 text-[10px] font-bold px-3 py-1 rounded-full border border-green-500/20 uppercase tracking-widest">Live Sync OK</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-slate-600 text-[10px] uppercase tracking-widest font-bold border-b border-slate-800">
              <tr>
                <th className="px-10 py-6">Operative</th>
                <th className="px-10 py-6">Config</th>
                <th className="px-10 py-6">Tier</th>
                <th className="px-10 py-6">Schedule</th>
                <th className="px-10 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-sm">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-10 py-32 text-center text-slate-700 uppercase tracking-[0.5em] font-bold italic">_NO_DATA_LOGGED_</td>
                </tr>
              ) : (
                [...bookings].reverse().map(b => (
                  <tr key={b.id} className="hover:bg-slate-800/20 transition-colors group">
                    <td className="px-10 py-6">
                      <span className="text-yellow-500 font-bold">{b.userName.toUpperCase()}</span>
                    </td>
                    <td className="px-10 py-6">
                       <span className={`px-3 py-1 rounded-lg border text-[10px] font-bold ${b.matchType === 'Drills' ? 'bg-blue-900/30 border-blue-500/30 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                         {b.matchType.toUpperCase()}
                       </span>
                    </td>
                    <td className="px-10 py-6">
                      <span className="text-slate-300 text-xs tracking-widest">{b.skillLevel.toUpperCase()}</span>
                    </td>
                    <td className="px-10 py-6">
                      <span className="text-white">{b.timeSlot}</span>
                      <span className="block text-slate-500 text-[10px] mt-1">{b.date}</span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <button 
                        onClick={() => onCancel(b.id)}
                        className="bg-red-900/20 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/30 px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                      >
                        Purge
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
