import { Movie, Theater, Seat } from './types';

export const MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Interstellar Odyssey',
    genre: ['Sci-Fi', 'Adventure'],
    duration: '2h 45m',
    rating: 9.2,
    language: 'English',
    posterUrl: 'https://picsum.photos/300/450?random=1',
    backdropUrl: 'https://picsum.photos/800/400?random=1',
    synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival. Visuals that will blow your mind.',
    cast: ['Matthew McC', 'Anne Hath', 'Jessica Ch'],
    releaseDate: '2024-10-15'
  },
  {
    id: '2',
    title: 'The Silent Samurai',
    genre: ['Action', 'Drama'],
    duration: '2h 10m',
    rating: 8.8,
    language: 'Japanese',
    posterUrl: 'https://picsum.photos/300/450?random=2',
    backdropUrl: 'https://picsum.photos/800/400?random=2',
    synopsis: 'In feudal Japan, a lone warrior must protect his village from a ruthless warlord using only his wit and blade.',
    cast: ['Hiroyuki S', 'Ken W'],
    releaseDate: '2024-11-01'
  },
  {
    id: '3',
    title: 'Cyberpunk City',
    genre: ['Sci-Fi', 'Thriller'],
    duration: '1h 55m',
    rating: 7.5,
    language: 'English',
    posterUrl: 'https://picsum.photos/300/450?random=3',
    backdropUrl: 'https://picsum.photos/800/400?random=3',
    synopsis: 'In a dystopian future, a hacker uncovers a conspiracy that threatens to tear the neon-lit city apart.',
    cast: ['Keanu R', 'Carrie-Anne M'],
    releaseDate: '2024-10-20'
  },
  {
    id: '4',
    title: 'Love in Paris',
    genre: ['Romance', 'Comedy'],
    duration: '1h 40m',
    rating: 7.2,
    language: 'French',
    posterUrl: 'https://picsum.photos/300/450?random=4',
    backdropUrl: 'https://picsum.photos/800/400?random=4',
    synopsis: 'Two strangers meet on a train to Paris and decide to spend one magical night together.',
    cast: ['Julie D', 'Ethan H'],
    releaseDate: '2024-09-12'
  },
    {
    id: '5',
    title: 'Dungeon Master',
    genre: ['Fantasy', 'Adventure'],
    duration: '2h 15m',
    rating: 8.0,
    language: 'English',
    posterUrl: 'https://picsum.photos/300/450?random=5',
    backdropUrl: 'https://picsum.photos/800/400?random=5',
    synopsis: 'A charming thief and a band of unlikely adventurers undertake an epic heist to retrieve a lost relic.',
    cast: ['Chris P', 'Michelle R'],
    releaseDate: '2024-12-05'
  }
];

export const THEATERS: Theater[] = [
  { id: 't1', name: 'AMB Cinemas', location: 'Gachibowli, Hyderabad', distances: '2.5 km' },
  { id: 't2', name: 'Prasads Multiplex', location: 'Necklace Road, Hyderabad', distances: '12.0 km' },
  { id: 't3', name: 'PVR: Preston Prime', location: 'Gachibowli, Hyderabad', distances: '3.2 km' },
  { id: 't4', name: 'INOX: GVK One', location: 'Banjara Hills, Hyderabad', distances: '8.5 km' },
  { id: 't5', name: 'Asian CinePlanet', location: 'Kompally, Hyderabad', distances: '18.0 km' },
  { id: 't6', name: 'PVR: Next Galleria', location: 'Panjagutta, Hyderabad', distances: '7.0 km' },
];

export const GENERATE_SEATS = (): Seat[] => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const cols = 8;
  const seats: Seat[] = [];

  rows.forEach((row, rIndex) => {
    for (let c = 1; c <= cols; c++) {
      const type = rIndex < 2 ? 'Standard' : rIndex < 5 ? 'Premium' : 'VIP';
      const price = type === 'Standard' ? 150 : type === 'Premium' ? 250 : 400;
      // Randomly occupy some seats
      const isOccupied = Math.random() < 0.3;
      seats.push({
        id: `${row}${c}`,
        row,
        col: c,
        price,
        type,
        isOccupied
      });
    }
  });
  return seats;
};