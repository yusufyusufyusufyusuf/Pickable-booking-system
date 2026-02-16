
import React, { useState, useEffect } from 'react';
import { User, Booking, MatchType, SkillLevel, AppView } from './types';
import { THE_PIT } from './constants';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);

  useEffect(() => {
    const saved = localStorage.getItem('basement_bookings_final');
    if (saved) {
      setBookings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('basement_bookings_final', JSON.stringify(bookings));
  }, [bookings]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'ADMIN') {
      setCurrentView(AppView.ADMIN_DASHBOARD);
    } else {
      setCurrentView(AppView.CUSTOMER_DASHBOARD);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView(AppView.LOGIN);
  };

  const addBooking = (date: string, timeSlot: string, matchType: MatchType, skillLevel: SkillLevel) => {
    if (!currentUser) return;
    
    const exists = bookings.find(b => b.date === date && b.timeSlot === timeSlot && b.status === 'Confirmed');
    if (exists) {
      alert("This slot is already occupied.");
      return;
    }

    const newBooking: Booking = {
      id: 'b-' + Math.random().toString(36).substr(2, 5),
      userId: currentUser.id,
      userName: currentUser.name,
      courtId: THE_PIT.id,
      date,
      timeSlot,
      status: 'Confirmed',
      matchType,
      skillLevel
    };

    setBookings(prev => [...prev, newBooking]);
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1120] text-slate-100 selection:bg-yellow-500 selection:text-slate-900">
      {currentView !== AppView.LOGIN && currentUser && (
        <Navbar 
          user={currentUser} 
          currentView={currentView}
          onLogout={handleLogout} 
        />
      )}

      <main className="flex-grow container mx-auto p-4 md:p-8 max-w-7xl">
        {currentView === AppView.LOGIN && (
          <Login onLogin={handleLogin} />
        )}

        {currentView === AppView.CUSTOMER_DASHBOARD && currentUser && (
          <Dashboard 
            user={currentUser} 
            bookings={bookings} 
            onBook={addBooking} 
            onCancel={cancelBooking}
          />
        )}

        {currentView === AppView.ADMIN_DASHBOARD && currentUser && (
          <AdminDashboard 
            bookings={bookings} 
            onCancel={cancelBooking}
            onClearAll={() => {
              if (confirm("DANGER: Wiping all system logs. Proceed?")) {
                setBookings([]);
                localStorage.removeItem('basement_bookings_final');
              }
            }}
          />
        )}
      </main>

      <footer className="bg-slate-900/50 border-t border-slate-800 p-8 text-center">
        <div className="text-slate-500 text-[10px] tracking-[0.5em] uppercase mb-2">
          BASEMENT BOOKING BALL COURT // NO SUN // NO MERCY
        </div>
        <div className="text-slate-700 text-[8px] uppercase tracking-widest">
          ESTABLISHED IN THE DARKNESS
        </div>
      </footer>
    </div>
  );
};

export default App;
