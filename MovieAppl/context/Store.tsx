import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Movie, Theater, Showtime, Seat, Booking } from '../types';

interface AppContextType {
  // Auth
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  
  // Booking Flow
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
  selectedTheater: Theater | null;
  setSelectedTheater: (theater: Theater | null) => void;
  selectedShowtime: Showtime | null;
  setSelectedShowtime: (time: Showtime | null) => void;
  selectedSeats: Seat[];
  toggleSeat: (seat: Seat) => void;
  resetBooking: () => void;
  
  // Transactions
  confirmBooking: (paymentMethod: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Booking State
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const login = (email: string, name: string) => {
    setUser({
      id: 'u123',
      name,
      email,
      bookings: []
    });
  };

  const logout = () => setUser(null);

  const toggleSeat = (seat: Seat) => {
    if (seat.isOccupied) return;
    setSelectedSeats(prev => {
      const exists = prev.find(s => s.id === seat.id);
      if (exists) return prev.filter(s => s.id !== seat.id);
      return [...prev, seat];
    });
  };

  const resetBooking = () => {
    setSelectedMovie(null);
    setSelectedTheater(null);
    setSelectedShowtime(null);
    setSelectedSeats([]);
  };

  const confirmBooking = (paymentMethod: string) => {
    if (!user || !selectedMovie || !selectedTheater || !selectedShowtime) return;

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      movieId: selectedMovie.id,
      theaterId: selectedTheater.id,
      showtimeId: selectedShowtime.id,
      seats: selectedSeats.map(s => s.id),
      totalAmount: selectedSeats.reduce((sum, s) => sum + s.price, 0),
      date: new Date().toISOString(),
      qrCode: `QR-${Date.now()}` // Mock QR content
    };

    const updatedUser = { ...user, bookings: [newBooking, ...user.bookings] };
    setUser(updatedUser);
    // Don't reset immediately so we can show ticket page
  };

  return (
    <AppContext.Provider value={{
      user, login, logout,
      selectedMovie, setSelectedMovie,
      selectedTheater, setSelectedTheater,
      selectedShowtime, setSelectedShowtime,
      selectedSeats, toggleSeat, resetBooking,
      confirmBooking
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
