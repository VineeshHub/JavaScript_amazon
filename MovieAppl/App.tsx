import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Ticket, User as UserIcon, ChevronLeft, Search, LogIn, Menu, Clapperboard, MapPin } from 'lucide-react';
import { AppProvider, useApp } from './context/Store';
import AIChat from './components/AIChat';

// Pages Import
import HomePage from './pages/Home';
import DetailsPage from './pages/Details';
import BookingPage from './pages/Booking';
import SeatPage from './pages/Seats';
import PaymentPage from './pages/Payment';
import TicketPage from './pages/Ticket';
import AuthPage from './pages/Auth';
import ProfilePage from './pages/Profile';
import TheatersPage from './pages/Theaters';

const Navbar: React.FC = () => {
  const { user } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (isAuthPage) return null;

  return (
    <>
      {/* Desktop Navbar */}
      <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-900 rounded-lg flex items-center justify-center font-bold text-white">C</div>
            <span className="font-bold text-xl tracking-tight text-white">CineMate</span>
          </Link>

          <nav className="flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm font-medium hover:text-brand-500 transition-colors ${location.pathname === '/' ? 'text-brand-500' : 'text-slate-300'}`}
            >
              Movies
            </Link>
            <Link 
              to="/theaters" 
              className={`text-sm font-medium hover:text-brand-500 transition-colors ${location.pathname === '/theaters' ? 'text-brand-500' : 'text-slate-300'}`}
            >
              Theaters
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-brand-500" />
              <input 
                type="text" 
                placeholder="Search movies..." 
                className="bg-slate-900 border border-slate-800 rounded-full py-1.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-500 w-64 transition-all"
              />
            </div>
            {user ? (
              <Link to="/profile" className="flex items-center gap-2 hover:bg-slate-800 py-1.5 px-3 rounded-full transition-colors border border-transparent hover:border-slate-700">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white">
                    {user.name.charAt(0)}
                  </div>
                </div>
                <span className="text-sm font-medium text-white">{user.name}</span>
              </Link>
            ) : (
              <Link to="/login" className="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2 rounded-full text-sm font-bold transition-colors shadow-lg shadow-brand-900/20">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Top Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 h-14 flex items-center justify-between md:hidden">
        {location.pathname === '/' ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-900 rounded-lg flex items-center justify-center font-bold text-white">C</div>
            <span className="font-bold text-lg tracking-tight text-white">CineMate</span>
          </div>
        ) : (
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-400 hover:text-white">
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400" />
            {user ? (
              <Link to="/profile" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-medium border border-slate-700 text-white">
                {user.name.charAt(0)}
              </Link>
            ) : (
              <Link to="/login" className="text-xs font-semibold text-brand-500 hover:text-brand-400">
                Sign In
              </Link>
            )}
        </div>
      </header>
    </>
  );
};

const BottomNav: React.FC = () => {
  const { user } = useApp();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const hideBottomNav = isAuthPage || location.pathname.includes('/seats') || location.pathname.includes('/payment');

  if (hideBottomNav) return null;

  return (
    <nav className="fixed bottom-0 w-full bg-slate-950/90 backdrop-blur-lg border-t border-slate-800 h-16 flex items-center justify-around z-40 md:hidden">
      <Link to="/" className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-brand-500' : 'text-slate-500 hover:text-slate-300'}`}>
        <Clapperboard className="w-5 h-5" />
        <span className="text-[10px] font-medium">Movies</span>
      </Link>
      <Link to="/theaters" className={`flex flex-col items-center gap-1 ${location.pathname === '/theaters' ? 'text-brand-500' : 'text-slate-500 hover:text-slate-300'}`}>
        <MapPin className="w-5 h-5" />
        <span className="text-[10px] font-medium">Theaters</span>
      </Link>
      <Link to="/profile" className={`flex flex-col items-center gap-1 ${location.pathname === '/profile' ? 'text-brand-500' : 'text-slate-500 hover:text-slate-300'}`}>
        <UserIcon className="w-5 h-5" />
        <span className="text-[10px] font-medium">Profile</span>
      </Link>
    </nav>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col relative">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 w-full h-full">
        {children}
      </main>

      <BottomNav />
      <AIChat />
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/theaters" element={<TheatersPage />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/signup" element={<AuthPage mode="signup" />} />
      <Route path="/movie/:id" element={<DetailsPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/seats" element={<SeatPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/ticket" element={<TicketPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </AppProvider>
  );
}