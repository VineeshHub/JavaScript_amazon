export interface Movie {
  id: string;
  title: string;
  genre: string[];
  duration: string;
  rating: number; // 1-10
  language: string;
  posterUrl: string;
  backdropUrl: string;
  synopsis: string;
  cast: string[];
  releaseDate: string;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  distances: string;
}

export interface Showtime {
  id: string;
  theaterId: string;
  time: string;
  format: '2D' | '3D' | 'IMAX';
}

export interface Seat {
  id: string;
  row: string;
  col: number;
  price: number;
  type: 'Standard' | 'Premium' | 'VIP';
  isOccupied: boolean;
}

export interface Booking {
  id: string;
  movieId: string;
  theaterId: string;
  showtimeId: string;
  seats: string[];
  totalAmount: number;
  date: string;
  qrCode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bookings: Booking[];
}
