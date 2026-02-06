import { SeriesDetails } from '@/types/Types';
import { fetcher } from '@/shared/services/fetcher';

export const getSeriesByGenreId = (
  genreId: number,
  page?: number,
): Promise<{ results: SeriesDetails[] }> => {
  const path = 'discover/tv';
  const query = `&with_genres=${genreId}`;
  return fetcher({ path, page, query });
};
