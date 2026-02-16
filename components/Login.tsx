import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<'CUSTOMER' | 'ADMIN'>('CUSTOMER');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'CUSTOMER') {
      if (!name || !email) return;
      onLogin({
        id: 'user-' + Math.random().toString(36).substr(2, 5),
        name,
        email,
        role: 'CUSTOMER'
      });
    } else {
      if (passcode === 'WARDEN') {
        onLogin({
          id: 'admin-001',
          name: 'THE WARDEN',
          email: 'warden@basement.pit',
          role: 'ADMIN'
        });
      } else {
        alert("ACCESS DENIED: INVALID AUTHORIZATION CODE");
        setPasscode('');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-xl mx-auto px-4">
      <div className="w-full bg-slate-900 border border-slate-800 p-2 rounded-[2.5rem] shadow-2xl mb-8">
        <div className="flex">
          <button 
            onClick={() => setActiveTab('CUSTOMER')}
            className={`flex-1 py-4 rounded-[2rem] text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'CUSTOMER' ? 'bg-yellow-500 text-slate-900 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Player Entry
          </button>
          <button 
            onClick={() => setActiveTab('ADMIN')}
            className={`flex-1 py-4 rounded-[2rem] text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'ADMIN' ? 'bg-slate-800 text-yellow-500 border border-yellow-500/20 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Warden Entry
          </button>
        </div>
      </div>

      <div className="w-full bg-slate-900 border border-slate-800 p-10 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        
        <div className="text-center mb-10">
          <h1 className="text-5xl font-mono-bold text-white mb-2 tracking-tighter">
            {activeTab === 'CUSTOMER' ? 'ACCESS_GRID' : 'SECURE_HUB'}
          </h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
            {activeTab === 'CUSTOMER' ? 'FREE COMMUNITY ACCESS' : 'WARDEN AUTHORIZATION REQUIRED'}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {activeTab === 'CUSTOMER' ? (
            <>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">Player Handle</label>
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="GHOST_DINKER"
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-slate-600 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">Comm Link (Email)</label>
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="link@pit.court"
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder:text-slate-600 font-mono text-sm"
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">Auth Passcode</label>
              <input 
                required
                type="password" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="********"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-center text-white focus:ring-1 focus:ring-yellow-500 outline-none font-mono tracking-[1em] text-xl placeholder:tracking-normal placeholder:text-slate-800"
              />
            </div>
          )}

          <button 
            type="submit"
            className={`w-full font-bold py-5 rounded-2xl transition-all active:scale-95 shadow-xl uppercase tracking-widest ${activeTab === 'CUSTOMER' ? 'bg-yellow-500 text-slate-900 hover:bg-yellow-400' : 'bg-slate-800 text-yellow-500 hover:bg-slate-700 border border-yellow-500/30'}`}
          >
            {activeTab === 'CUSTOMER' ? 'Login to The Pit' : 'Establish Link'}
          </button>
        </form>

        <p className="mt-10 text-center text-[9px] text-slate-600 uppercase tracking-[0.3em]">
          NO FEES REQUIRED // ALL SESSIONS ARE FREE
        </p>
      </div>
    </div>
  );
};

export default Login;