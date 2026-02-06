import { MovieDetails } from '@/types/Types';
import { fetcher } from '@/services/fetcher';

export const getMoviesByGenreId = (
  genreId: number,
  page?: number,
): Promise<{ results: MovieDetails[] }> => {
  const path = 'discover/movie';
  const query = `&with_genres=${genreId}`;
  return fetcher({ path, page, query });
};
