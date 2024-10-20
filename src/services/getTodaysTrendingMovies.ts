import { fetcher } from './fetcher';

export const getTodaysTrendingMovies = (page?: number) => {
  const path = 'trending/movie/day';
  return fetcher({ path, page });
};
