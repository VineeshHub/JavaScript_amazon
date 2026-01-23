import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, ChevronRight, User, Star, Clock } from 'lucide-react';
import { useApp } from '../context/Store';
import { MOVIES } from '../constants';

const DetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedMovie } = useApp();
  
  const movie = MOVIES.find(m => m.id === id);

  if (!movie) return <div className="p-8 text-center">Movie not found</div>;

  const handleBook = () => {
    setSelectedMovie(movie);
    navigate('/booking');
  };

  return (
    <div className="relative min-h-screen">
      {/* Background with blur */}
      <div className="fixed inset-0 z-0">
          <img src={movie.backdropUrl} className="w-full h-full object-cover opacity-20 blur-xl" />
          <div className="absolute inset-0 bg-slate-950/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            
            {/* Poster Column */}
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-800 relative group">
                    <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                    <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                         <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                             <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                         </div>
                    </button>
                </div>
            </div>

            {/* Content Column */}
            <div className="flex-1 text-white">
                <div className="mb-6">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>
                    <div className="flex flex-wrap gap-3 mb-6">
                        {movie.genre.map(g => (
                            <span key={g} className="px-3 py-1 bg-slate-800/80 border border-slate-700 text-slate-300 text-sm rounded-full">
                            {g}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-8 border-y border-slate-800 py-6 mb-8 bg-slate-900/50 rounded-xl px-6 backdrop-blur-sm">
                        <div className="flex flex-col gap-1">
                            <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Rating</span>
                            <div className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-500" fill="currentColor"/>
                                <span className="font-bold text-2xl">{movie.rating}</span>
                                <span className="text-slate-500 text-sm">/10</span>
                            </div>
                        </div>
                        <div className="w-px h-10 bg-slate-700" />
                        <div className="flex flex-col gap-1">
                             <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Duration</span>
                             <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-slate-400" />
                                <span className="font-bold text-2xl">{movie.duration}</span>
                            </div>
                        </div>
                        <div className="w-px h-10 bg-slate-700 hidden md:block" />
                        <div className="hidden md:flex flex-col gap-1">
                             <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Language</span>
                             <span className="font-bold text-2xl">{movie.language}</span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-3">Synopsis</h3>
                        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
                            {movie.synopsis}
                        </p>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-xl font-bold mb-4">Cast & Crew</h3>
                        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
                            {movie.cast.map((actor, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-3 min-w-[100px]">
                                <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-slate-700 hover:border-brand-500 transition-colors">
                                <User className="w-8 h-8 text-slate-600" />
                                </div>
                                <span className="text-sm font-medium text-center text-slate-200">{actor}</span>
                            </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 sticky bottom-4 md:static z-20">
                        <button 
                            onClick={handleBook}
                            className="flex-1 md:flex-none md:w-64 bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-500 transition-all shadow-xl shadow-brand-900/30 transform hover:-translate-y-1"
                        >
                            Book Tickets
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
