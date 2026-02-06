import { Route } from '@/shared/types/route.types';

export const genresRoutes: Route[] = [
  {
    id: 1,
    text: 'Action',
    href: '/genres/action',
  },
  {
    id: 2,
    text: 'Comedies',
    href: '/genres/comedy',
  },
  {
    id: 3,
    text: 'Romance',
    href: '/genres/romance',
  },
  {
    id: 4,
    text: 'Documentaries',
    href: '/genres/documentary',
  },
  {
    id: 5,
    text: 'Horror',
    href: '/genres/horror',
  },
  {
    id: 6,
    text: 'Fantasy',
    href: '/genres/fantasy',
  },
  {
    id: 7,
    text: 'Adventure',
    href: '/adventure',
  },
  {
    id: 8,
    text: 'Animation',
    href: '/animation',
  },
  {
    id: 9,
    text: 'Crime',
    href: '/genres/crime',
  },
  {
    id: 10,
    text: 'Drama',
    href: '/genres/drama',
  },
  {
    id: 11,
    text: 'Family',
    href: '/genres/family',
  },
  {
    id: 12,
    text: 'History',
    href: '/genres/history',
  },
  {
    id: 13,
    text: 'Music',
    href: '/genres/music',
  },
  {
    id: 14,
    text: 'Mystery',
    href: '/genres/mystery',
  },
  {
    id: 15,
    text: 'War',
    href: '/genres/war',
  },
  {
    id: 16,
    text: 'Western',
    href: '/genres/western',
  },
  {
    id: 17,
    text: 'Thriller',
    href: '/genres/thriller',
  },
];

export const tmdbApiEndpoints = {
  todaysTrendingovies: 'trending/movie/day',
  trendingMovies: 'trending/movie/week',
  upcomingMovies: 'movie/upcoming',
  topRatedMovies: 'movie/top_rated',
  topRatedSeries: 'tv/top_rated',
  popularSeries: 'tv/popular',
  onTheAirSeries: 'tv/on_the_air',
  airingTodaySeries: 'tv/airing_today',
};
