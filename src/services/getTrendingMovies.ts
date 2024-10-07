import { fetcher } from './fetcher';

export const getTrendingMovies = async (page?: number) => {
  const path = 'trending/movie/day';
  return fetcher({ path, page });
};
