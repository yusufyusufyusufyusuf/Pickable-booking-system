import React, { useState, useMemo } from 'react';
import { User, Booking, MatchType, SkillLevel } from '../types';
import { THE_PIT, TIME_SLOTS } from '../constants';

interface DashboardProps {
  user: User;
  bookings: Booking[];
  onBook: (date: string, timeSlot: string, matchType: MatchType, skillLevel: SkillLevel) => void;
  onCancel: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, bookings, onBook, onCancel 
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [pendingSlot, setPendingSlot] = useState<string | null>(null);
  
  const [matchType, setMatchType] = useState<MatchType>('Singles');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('Intermediate');

  const todayBookings = bookings.filter(b => b.date === selectedDate);
  const myBookings = bookings.filter(b => b.userId === user.id);

  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const isoString = date.toISOString().split('T')[0];
      
      const dayBookings = bookings.filter(b => b.date === isoString);
      const isFull = dayBookings.length >= TIME_SLOTS.length;
      const fillPercentage = (dayBookings.length / TIME_SLOTS.length) * 100;

      days.push({
        isoString,
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: date.getDate(),
        isFull,
        fillPercentage
      });
    }
    return days;
  }, [bookings]);

  const startBooking = (slot: string) => {
    setPendingSlot(slot);
    setIsBookingModalOpen(true);
  };

  const confirmBooking = () => {
    if (pendingSlot) {
      onBook(selectedDate, pendingSlot, matchType, skillLevel);
      setIsBookingModalOpen(false);
    }
  };

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700">
      {/* Immersive Header */}
      <section className="relative h-[450px] rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl">
        <img src={THE_PIT.imageUrl} className="w-full h-full object-cover grayscale opacity-40 brightness-75 scale-105" alt="The Pit" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/60 to-transparent"></div>
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-yellow-500 text-slate-900 text-[10px] font-bold rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(234,179,8,0.4)]">Level -1</span>
              <div className="px-3 py-1 bg-green-500/20 text-green-500 text-[10px] font-bold rounded-full border border-green-500/30 uppercase tracking-[0.2em] animate-pulse">
                COMMUNITY_FREE_ZONE
              </div>
              <span className="text-yellow-500/50 font-mono text-xs uppercase tracking-[0.2em]">Operational Excellence</span>
            </div>
            <h1 className="text-8xl md:text-9xl font-mono-bold text-white tracking-tighter leading-none mb-6">THE PIT</h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">{THE_PIT.description}</p>
          </div>
        </div>
      </section>

      {/* Enhanced Date Picker Section */}
      <section className="bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800 shadow-inner">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h3 className="text-3xl font-bold text-white flex items-center gap-3">
              Mission Timeline
              <span className="text-[10px] text-yellow-500 font-mono font-normal uppercase tracking-widest border border-yellow-500/20 px-3 py-1 rounded-full bg-yellow-500/5">Live Grid</span>
            </h3>
            <p className="text-slate-500 text-xs uppercase tracking-widest mt-2 italic font-medium">Coordinate your deployment window</p>
          </div>
          <div className="flex items-center gap-6 text-[9px] font-bold uppercase tracking-widest text-slate-400">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500/30"></span> Vacant</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-600"></span> Locked</div>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
          {calendarDays.map((day) => (
            <button
              key={day.isoString}
              onClick={() => setSelectedDate(day.isoString)}
              className={`flex-shrink-0 w-24 h-32 rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 relative group overflow-hidden ${
                selectedDate === day.isoString
                  ? 'bg-yellow-500 border-yellow-500 text-slate-900 shadow-[0_0_25px_rgba(234,179,8,0.2)] scale-105 z-10'
                  : 'bg-slate-800/40 border-slate-700 hover:border-slate-500 text-slate-400'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase mb-1 ${selectedDate === day.isoString ? 'text-slate-900' : 'text-slate-500'}`}>{day.label}</span>
              <span className={`text-3xl font-mono-bold ${selectedDate === day.isoString ? 'text-slate-900' : 'text-white'}`}>{day.dayNum}</span>
              
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-900/50 flex">
                <div 
                  className={`h-full transition-all duration-500 ${day.isFull ? 'bg-red-600' : 'bg-yellow-500/30'}`} 
                  style={{ width: `${day.fillPercentage}%` }}
                ></div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {TIME_SLOTS.map(slot => {
              const booking = todayBookings.find(b => b.timeSlot === slot);
              const isMine = booking?.userId === user.id;
              
              return (
                <button
                  key={slot}
                  disabled={!!booking && !isMine}
                  onClick={() => isMine ? onCancel(booking.id) : startBooking(slot)}
                  className={`relative p-8 rounded-[2.5rem] border transition-all h-40 flex flex-col items-center justify-center text-center ${
                    isMine 
                      ? 'bg-red-900/10 border-red-500/50 hover:bg-red-900/30 shadow-lg shadow-red-900/10' 
                      : booking 
                        ? 'bg-slate-900 border-slate-800 opacity-40 cursor-not-allowed grayscale' 
                        : 'bg-slate-800/40 border-slate-700 hover:border-yellow-500/50 hover:bg-slate-800/60 group'
                  }`}
                >
                  <span className="text-base font-mono-bold text-white mb-3 tracking-tighter">{slot}</span>
                  {booking ? (
                    <div className="space-y-1">
                      <span className="text-[10px] block font-bold text-yellow-500 uppercase tracking-widest">{booking.userName}</span>
                      <span className="text-[9px] block text-slate-500 uppercase font-bold tracking-[0.2em]">{booking.matchType} // {booking.skillLevel}</span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-600 uppercase font-bold tracking-[0.3em] group-hover:text-yellow-500/50">OPEN_SLOT</span>
                  )}
                  {isMine && <span className="absolute top-5 right-5 text-[8px] text-red-500 font-bold uppercase tracking-[0.3em]">OWNED</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            </div>
            <h4 className="text-2xl font-bold text-white mb-10 flex items-center gap-4">
              <span className="w-1.5 h-6 bg-yellow-500 rounded-full"></span>
              My Assignments
            </h4>
            
            {myBookings.length === 0 ? (
              <div className="text-center py-16 px-8 border border-dashed border-slate-800 rounded-[2rem] bg-slate-950/20">
                <p className="text-slate-700 text-[10px] uppercase tracking-[0.4em] font-bold">GRID_EMPTY</p>
                <p className="text-slate-800 text-[8px] mt-2 uppercase">Awaiting operation deployment</p>
              </div>
            ) : (
              <div className="space-y-5">
                {myBookings.map(b => (
                  <div key={b.id} className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 flex justify-between items-center hover:border-slate-500 transition-all group">
                    <div>
                      <p className="text-white font-mono text-base font-bold tracking-tight">{b.timeSlot}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mt-2">{b.date}</p>
                    </div>
                    <button 
                      onClick={() => onCancel(b.id)} 
                      className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                    >
                      ABORT
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-10 bg-slate-900/40 border border-slate-800 rounded-[3rem] border-dashed">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                </div>
                <p className="text-[11px] text-white font-bold uppercase tracking-widest">Protocol Notice</p>
             </div>
             <p className="text-slate-500 text-xs leading-relaxed font-medium">The Pit operates on a strict community-governed schedule. This facility is 100% free. Please respect the space and your fellow players.</p>
          </div>
        </div>
      </div>

      {isBookingModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/98 backdrop-blur-2xl animate-in zoom-in-95 duration-200">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-[3.5rem] p-12 shadow-2xl relative">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center shadow-2xl">
               <div className="w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center text-slate-900 shadow-xl shadow-yellow-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
               </div>
            </div>
            
            <div className="text-center mt-12 mb-12">
              <h2 className="text-4xl font-mono-bold text-white tracking-tighter uppercase mb-3">LOCK_SLOT: {pendingSlot}</h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em]">Finalizing parameters for deployment</p>
            </div>
            
            <div className="space-y-10">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-5 ml-2">Engagement Strategy</label>
                <div className="grid grid-cols-3 gap-4">
                  {(['Singles', 'Doubles', 'Drills'] as MatchType[]).map(t => (
                    <button 
                      key={t} 
                      onClick={() => setMatchType(t)} 
                      className={`py-5 text-[10px] font-bold rounded-2xl border transition-all ${
                        matchType === t 
                        ? 'bg-yellow-500 border-yellow-500 text-slate-900 shadow-xl shadow-yellow-500/20 scale-[1.02]' 
                        : 'bg-slate-800/60 border-slate-700 text-slate-500 hover:border-slate-500'
                      }`}
                    >
                      {t.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-5 ml-2">Operative Rank</label>
                <div className="grid grid-cols-2 gap-4">
                  {(['Beginner', 'Intermediate', 'Advanced', 'Pro'] as SkillLevel[]).map(l => (
                    <button 
                      key={l} 
                      onClick={() => setSkillLevel(l)} 
                      className={`py-5 text-[10px] font-bold rounded-2xl border transition-all ${
                        skillLevel === l 
                        ? 'bg-yellow-500 border-yellow-500 text-slate-900 shadow-xl shadow-yellow-500/20 scale-[1.02]' 
                        : 'bg-slate-800/60 border-slate-700 text-slate-500 hover:border-slate-500'
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex flex-col gap-4">
                <button 
                  onClick={confirmBooking} 
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-6 rounded-[2rem] text-[12px] uppercase tracking-[0.4em] shadow-2xl shadow-yellow-500/10 active:scale-[0.98] transition-all"
                >
                  SECURE_DEPLOYMENT
                </button>
                <button 
                  onClick={() => setIsBookingModalOpen(false)} 
                  className="w-full text-slate-600 hover:text-red-500 font-bold py-3 text-[10px] uppercase tracking-[0.3em] transition-all"
                >
                  ABORT_ACTION
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;