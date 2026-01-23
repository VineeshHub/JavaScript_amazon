import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Share2, Download, Home } from 'lucide-react';
import { useApp } from '../context/Store';

const TicketPage: React.FC = () => {
  const { user, selectedMovie, selectedTheater, selectedShowtime, selectedSeats, resetBooking } = useApp();

  // If page accessed directly without booking, redirect
  if (!user || !user.bookings.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
        <p className="text-slate-400 mb-4">No recent bookings found.</p>
        <Link to="/" className="text-brand-500 font-bold">Back Home</Link>
      </div>
    );
  }

  const booking = user.bookings[0]; // Get latest booking
  // NOTE: In a real app we'd fetch by ID from URL, but using context for simplicity here.

  return (
    <div className="p-4 flex flex-col items-center pt-8">
      <div className="bg-white text-slate-900 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Ticket Header */}
        <div className="relative h-48">
          <img src={selectedMovie?.posterUrl} className="w-full h-full object-cover" alt="Movie" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-bold leading-none mb-1">{selectedMovie?.title}</h2>
            <p className="text-sm opacity-90">{selectedMovie?.language} • {selectedMovie?.format || '2D'}</p>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="p-6 relative">
          {/* Punch holes */}
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-slate-950 rounded-full"></div>
          <div className="absolute -top-3 -right-3 w-6 h-6 bg-slate-950 rounded-full"></div>
          
          <div className="grid grid-cols-2 gap-y-6 mb-6">
             <div>
               <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Date</p>
               <p className="font-semibold text-lg">Today</p>
             </div>
             <div className="text-right">
               <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Time</p>
               <p className="font-semibold text-lg">{selectedShowtime?.time}</p>
             </div>
             <div>
               <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Theater</p>
               <p className="font-semibold text-sm">{selectedTheater?.name}</p>
               <p className="text-xs text-slate-400 truncate w-32">{selectedTheater?.location}</p>
             </div>
             <div className="text-right">
               <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Seats</p>
               <p className="font-semibold text-lg text-brand-600">{selectedSeats.map(s => `${s.row}${s.col}`).join(', ')}</p>
             </div>
          </div>

          <div className="border-t border-dashed border-slate-300 my-4"></div>

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-slate-100 p-2 rounded-xl">
               <QrCode className="w-32 h-32 text-slate-900" />
            </div>
            <p className="text-xs text-slate-400">Scan this QR code at the entrance</p>
            <p className="text-xs font-mono text-slate-500 mt-1">ID: {booking.id}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8 w-full max-w-sm">
        <button className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl transition-colors">
          <Download className="w-4 h-4" /> Save
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl transition-colors">
          <Share2 className="w-4 h-4" /> Share
        </button>
      </div>

      <Link 
        to="/" 
        onClick={resetBooking}
        className="mt-8 text-brand-500 font-medium flex items-center gap-2 hover:underline"
      >
        <Home className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  );
};

export default TicketPage;
