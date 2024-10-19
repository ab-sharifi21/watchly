import { fetcher } from './fetcher';

export const getUpcomingMovies = (page?: number) => {
  const path = 'movie/upcoming';
  return fetcher({ path, page });
};
