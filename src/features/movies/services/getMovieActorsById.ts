import { fetcher } from '@/services/fetcher';

export const getMovieActorsById = (movieId: string | number) => {
  const path = `movie/${movieId}/credits`;
  return fetcher({ path });
};
