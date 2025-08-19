import { Event } from '@/context/BookingContext';

export const sampleEvents: Event[] = [
  {
    id: 'e1',
    title: 'Live Concert: The Reactors',
    date: '2025-09-12T19:30:00Z',
    venue: 'City Arena',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81',
    description: 'An electrifying night of music and performance by The Reactors.',
  },
  {
    id: 'e2',
    title: 'Tech Conference 2025',
    date: '2025-11-02T09:00:00Z',
    venue: 'Innovation Center',
    price: 199.0,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df',
    description: 'A full-day conference with talks, workshops, and networking.',
  },
  {
    id: 'e3',
    title: 'Stand-up Comedy Night',
    date: '2025-10-05T21:00:00Z',
    venue: 'Comedy Club',
    price: 25.0,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
    description: 'Laugh out loud with top comedians from around the country.',
  },
];

