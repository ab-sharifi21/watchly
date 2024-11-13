import { MovieDetails } from '@/types/Types';
import { fetcher } from './fetcher';

export const getUpcomingMovies = (
  page?: number,
): Promise<{ results: MovieDetails[] }> => {
  const path = 'movie/upcoming';
  return fetcher({ path, page });
};
