import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Film } from 'lucide-react';
import { THEATERS } from '../constants';

const TheatersPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-bold text-white mb-2">Cinemas in Hyderabad</h1>
           <p className="text-slate-400">Experience movies at the best theaters near you</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {THEATERS.map((theater, idx) => (
          <div key={theater.id} className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-brand-500/50 transition-all hover:shadow-xl hover:shadow-brand-900/10 group">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center text-brand-500 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <Film className="w-6 h-6" />
              </div>
              <span className="bg-green-900/20 text-green-400 text-xs px-2 py-1 rounded font-bold border border-green-900/30">
                4 Shows Today
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{theater.name}</h3>
            
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
              <MapPin className="w-4 h-4 text-brand-500" />
              <span>{theater.location}</span>
              <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
              <span>{theater.distances}</span>
            </div>

            <div className="flex gap-2 mb-6">
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">Dolby Atmos</span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">4K Laser</span>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">Recliners</span>
            </div>

            <Link 
              to="/" 
              className="block w-full bg-slate-800 hover:bg-brand-600 text-white font-bold py-3 rounded-xl text-center transition-colors"
            >
              View Movies
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheatersPage;