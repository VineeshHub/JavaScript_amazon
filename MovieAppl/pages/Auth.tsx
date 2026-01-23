import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/Store';

interface AuthPageProps {
  mode: 'login' | 'signup';
}

const AuthPage: React.FC<AuthPageProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { login } = useApp();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    login(email, name || 'User');
    navigate(-1); // Go back to where they came from
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-900 rounded-2xl mx-auto flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg shadow-brand-500/30">C</div>
          <h1 className="text-3xl font-bold text-white mb-2">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-slate-400">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs text-slate-400 ml-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-brand-500 transition-colors"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div className="space-y-1">
            <label className="text-xs text-slate-400 ml-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-brand-500 transition-colors"
              placeholder="hello@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-brand-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {mode === 'login' && (
            <div className="flex justify-end">
              <button type="button" className="text-xs text-brand-500 hover:text-brand-400 font-medium">Forgot Password?</button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-900/40 transition-all active:scale-[0.98] mt-4"
          >
            {mode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => navigate(mode === 'login' ? '/signup' : '/login')} 
              className="text-brand-500 font-bold hover:underline"
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
