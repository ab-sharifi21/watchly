import { fetcher } from './fetcher';

export const getTrendingMovies = async (page?: number) => {
  const path = 'trending/movie/week';
  return fetcher({ path, page });
};
