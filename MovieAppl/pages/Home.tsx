import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { MOVIES } from '../constants';
import { useApp } from '../context/Store';

const HomePage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const { setSelectedMovie } = useApp();

  const genres = ['All', 'Action', 'Sci-Fi', 'Romance', 'Comedy'];
  
  const filteredMovies = filter === 'All' 
    ? MOVIES 
    : MOVIES.filter(m => m.genre.includes(filter));

  const featuredMovie = MOVIES[0];

  return (
    <div className="pb-20 md:pb-8">
      {/* Hero Section */}
      <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
        <div className="absolute inset-0">
            <img 
            src={featuredMovie.backdropUrl} 
            alt="Featured" 
            className="w-full h-full object-cover opacity-60 mask-image-gradient"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 flex flex-col items-start max-w-7xl mx-auto">
          <span className="px-3 py-1 bg-brand-600 text-white text-xs md:text-sm font-bold rounded mb-4 inline-block tracking-wider">NOW SHOWING</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight max-w-2xl">{featuredMovie.title}</h1>
          
          <div className="flex items-center text-slate-300 text-sm md:text-base gap-4 mb-8">
            <span className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-1 rounded"><Star className="w-4 h-4 text-yellow-500" fill="currentColor"/> {featuredMovie.rating}</span>
            <span className="bg-white/10 backdrop-blur-md px-2 py-1 rounded">{featuredMovie.genre.join(', ')}</span>
            <span className="bg-white/10 backdrop-blur-md px-2 py-1 rounded">{featuredMovie.duration}</span>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <Link 
                to={`/movie/${featuredMovie.id}`}
                onClick={() => setSelectedMovie(featuredMovie)}
                className="flex-1 md:flex-none md:w-48 bg-brand-600 text-white font-bold py-4 rounded-xl text-center hover:bg-brand-500 transition-all shadow-lg shadow-brand-900/40"
            >
                Book Ticket
            </Link>
            <button className="flex-1 md:flex-none md:w-48 bg-white/10 backdrop-blur-md text-white font-bold py-4 rounded-xl text-center hover:bg-white/20 transition-all border border-white/10">
                Watch Trailer
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {genres.map(g => (
                <button
                    key={g}
                    onClick={() => setFilter(g)}
                    className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    filter === g 
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/20' 
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-600 hover:text-slate-200'
                    }`}
                >
                    {g}
                </button>
                ))}
            </div>
            <div className="hidden md:flex text-brand-500 text-sm font-bold cursor-pointer hover:underline">View All Movies</div>
        </div>

        {/* Movie List */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map(movie => (
            <Link 
              to={`/movie/${movie.id}`} 
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
              className="group"
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 bg-slate-900 shadow-xl border border-slate-800 group-hover:border-brand-500/50 transition-all">
                <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs flex items-center gap-1 font-bold">
                  <Star className="w-3 h-3 text-yellow-500" fill="currentColor" />
                  {movie.rating}
                </div>

                <button className="absolute bottom-4 left-4 right-4 bg-brand-600 text-white py-2 rounded-lg text-sm font-bold translate-y-12 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                    Book Now
                </button>
              </div>
              <h3 className="text-white font-bold truncate text-lg group-hover:text-brand-500 transition-colors">{movie.title}</h3>
              <p className="text-slate-500 text-sm">{movie.genre.join(', ')}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
