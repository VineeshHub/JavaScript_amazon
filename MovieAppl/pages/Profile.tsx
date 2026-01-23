import React from 'react';
import { User as UserIcon, Settings, CreditCard, LogOut, Ticket } from 'lucide-react';
import { useApp } from '../context/Store';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-500 to-purple-600 p-1">
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
            <UserIcon className="w-8 h-8 text-slate-200" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">{user.name}</h1>
          <p className="text-slate-400 text-sm">{user.email}</p>
          <button className="text-brand-500 text-xs mt-1 font-medium">Edit Profile</button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
           <div className="flex items-center gap-3 mb-4 text-white font-medium">
             <Ticket className="w-5 h-5 text-brand-500" />
             My Bookings
           </div>
           {user.bookings.length > 0 ? (
             <div className="space-y-3">
               {user.bookings.map(b => (
                 <div key={b.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                   <div>
                     <p className="text-white text-sm font-medium">Booking #{b.id.slice(-4)}</p>
                     <p className="text-xs text-slate-500">{new Date(b.date).toLocaleDateString()}</p>
                   </div>
                   <span className="text-brand-500 font-bold">${b.totalAmount}</span>
                 </div>
               ))}
             </div>
           ) : (
             <p className="text-slate-500 text-sm">No bookings yet.</p>
           )}
        </div>

        <button className="w-full bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center gap-3 text-white hover:bg-slate-800 transition-colors">
          <CreditCard className="w-5 h-5 text-slate-400" />
          <span>Payment Methods</span>
        </button>

        <button className="w-full bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center gap-3 text-white hover:bg-slate-800 transition-colors">
          <Settings className="w-5 h-5 text-slate-400" />
          <span>Settings</span>
        </button>

        <button 
          onClick={handleLogout}
          className="w-full bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center gap-3 text-red-500 hover:bg-slate-800 transition-colors mt-8"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
