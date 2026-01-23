import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/Store';
import { GENERATE_SEATS } from '../constants';
import { Seat } from '../types';

const SeatPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedMovie, selectedTheater, selectedShowtime, selectedSeats, toggleSeat, resetBooking } = useApp();
  const [seats, setSeats] = useState<Seat[]>([]);

  // Initialize Seats on mount
  useEffect(() => {
    setSeats(GENERATE_SEATS());
  }, []);

  const totalPrice = selectedSeats.reduce((acc, s) => acc + s.price, 0);

  const getSeatColor = (seat: Seat) => {
    if (seat.isOccupied) return 'bg-slate-800 cursor-not-allowed';
    if (selectedSeats.find(s => s.id === seat.id)) return 'bg-brand-600 text-white shadow-lg shadow-brand-500/50 scale-110 z-10';
    if (seat.type === 'VIP') return 'border border-purple-500/50 bg-slate-900 hover:bg-purple-900/20';
    if (seat.type === 'Premium') return 'border border-blue-500/50 bg-slate-900 hover:bg-blue-900/20';
    return 'border border-slate-700 bg-slate-900 hover:bg-slate-800';
  };

  const rows = Array.from(new Set(seats.map(s => s.row)));

  if (!selectedMovie || !selectedTheater) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-auto min-h-screen">
       {/* Header Info */}
       <div className="bg-slate-950 border-b border-slate-800 py-4">
            <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-white">{selectedMovie.title}</h2>
                    <p className="text-sm text-slate-400">{selectedTheater.name} • {selectedShowtime?.time}</p>
                </div>
                <div className="text-right hidden md:block">
                     <p className="text-xs text-slate-500 uppercase tracking-wider">Tickets</p>
                     <p className="text-xl font-bold text-brand-500">{selectedSeats.length}</p>
                </div>
            </div>
       </div>

       {/* Screen Area */}
       <div className="flex-1 overflow-y-auto px-4 py-8 bg-slate-950">
         <div className="max-w-3xl mx-auto">
            <div className="w-full h-12 relative mb-12 perspective-[500px]">
                <div className="w-full h-full bg-gradient-to-b from-brand-500/20 to-transparent opacity-50 transform rotate-x-12 rounded-t-[50%] blur-sm border-t border-brand-500/50"></div>
                <p className="text-center text-xs text-slate-500 mt-2 uppercase tracking-[0.2em]">Screen</p>
            </div>

            {/* Seat Grid */}
            <div className="flex flex-col gap-3 items-center mb-12">
            {rows.map(row => (
                <div key={row} className="flex gap-4 items-center">
                <span className="w-6 text-sm text-slate-500 text-center font-bold">{row}</span>
                <div className="flex gap-3">
                    {seats.filter(s => s.row === row).map(seat => (
                    <button
                        key={seat.id}
                        onClick={() => toggleSeat(seat)}
                        disabled={seat.isOccupied}
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-t-lg text-[10px] md:text-xs font-medium flex items-center justify-center transition-all duration-200 ${getSeatColor(seat)}`}
                    >
                        {seat.col}
                    </button>
                    ))}
                </div>
                </div>
            ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-8 mb-24 md:mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded bg-slate-800 border border-slate-700"></div>
                    <span className="text-sm text-slate-400">Booked</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded bg-slate-900 border border-brand-500"></div>
                    <span className="text-sm text-slate-400">Available</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded bg-brand-600 shadow-lg shadow-brand-500/40"></div>
                    <span className="text-sm text-slate-400">Selected</span>
                </div>
            </div>
         </div>
       </div>

       {/* Footer */}
       <div className="fixed md:sticky bottom-0 w-full bg-slate-900 border-t border-slate-800 p-4 md:py-6 z-30">
         <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
            <div className="flex-1">
                <p className="text-xs text-slate-400 mb-1">Total Price</p>
                <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-white">${totalPrice}</p>
                    <span className="text-sm text-slate-500 hidden md:inline-block">for {selectedSeats.length} seats</span>
                </div>
            </div>
            
            <div className="hidden md:block flex-1 text-center">
                 <p className="text-xs text-slate-400">Selected Seats</p>
                 <p className="text-white font-medium">{selectedSeats.map(s => `${s.row}${s.col}`).join(', ') || 'None'}</p>
            </div>

            <button
            onClick={() => navigate('/payment')}
            disabled={selectedSeats.length === 0}
            className="flex-1 md:max-w-xs bg-brand-600 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:bg-brand-500 hover:shadow-brand-900/40"
            >
            Proceed to Pay
            </button>
         </div>
       </div>
    </div>
  );
};

export default SeatPage;
