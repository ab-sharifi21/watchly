import { fetcher } from '@/services/fetcher';

export const getMovieWatchProviders = (movieId: string | number) => {
  const path = `movie/${movieId}/watch/providers`;
  return fetcher({ path });
};
