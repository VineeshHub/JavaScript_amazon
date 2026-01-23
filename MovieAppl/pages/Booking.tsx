import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { useApp } from '../context/Store';
import { THEATERS } from '../constants';

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedMovie, setSelectedTheater, setSelectedShowtime } = useApp();
  const [selectedDate, setSelectedDate] = useState(0);

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      fullDate: d
    };
  });

  const timeSlots = ['10:30 AM', '01:15 PM', '04:00 PM', '07:30 PM', '10:15 PM'];

  const handleTimeSelect = (theaterId: string, time: string) => {
    const theater = THEATERS.find(t => t.id === theaterId);
    if (!theater) return;

    setSelectedTheater(theater);
    setSelectedShowtime({
      id: `${theaterId}-${time}`,
      theaterId: theater.id,
      time,
      format: '2D' // default for mock
    });
    navigate('/seats');
  };

  if (!selectedMovie) return <div className="text-center p-10">Please select a movie first.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Book Tickets</h1>
      <p className="text-slate-400 mb-8">{selectedMovie.title} • {selectedMovie.language}</p>

      {/* Date Picker */}
      <div className="mb-10">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Select Date</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {dates.map((d, i) => (
            <button
                key={i}
                onClick={() => setSelectedDate(i)}
                className={`flex flex-col items-center justify-center min-w-[80px] h-[90px] rounded-2xl border transition-all ${
                selectedDate === i
                    ? 'bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-900/30 scale-105'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600 hover:bg-slate-800'
                }`}
            >
                <span className="text-sm font-medium uppercase">{d.day}</span>
                <span className="text-2xl font-bold">{d.date}</span>
            </button>
            ))}
        </div>
      </div>

      {/* Theaters List */}
      <div>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Select Theater & Time</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {THEATERS.map((theater) => (
            <div key={theater.id} className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-slate-600 transition-colors">
                <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="font-bold text-white text-lg">{theater.name}</h3>
                    <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{theater.location} • {theater.distances}</span>
                    </div>
                </div>
                <span className="px-3 py-1 bg-green-900/20 text-green-400 text-xs font-bold rounded-full border border-green-900/50">M-Ticket</span>
                </div>

                <div className="flex flex-wrap gap-3">
                {timeSlots.map((time) => (
                    <button
                    key={time}
                    onClick={() => handleTimeSelect(theater.id, time)}
                    className="px-4 py-2 rounded-lg border border-slate-700 text-sm font-medium text-slate-300 hover:bg-brand-600 hover:border-brand-600 hover:text-white transition-all hover:shadow-lg"
                    >
                    {time}
                    </button>
                ))}
                </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
