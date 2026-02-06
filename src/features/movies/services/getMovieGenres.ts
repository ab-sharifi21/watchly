import { fetcher } from '@/shared/services/fetcher';

export const getMoviesGenres = () => {
  const path = 'genre/movie/list';
  return fetcher({ path });
};
