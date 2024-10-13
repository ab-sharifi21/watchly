import { fetcher } from './fetcher';

export const getMoviesGenres = () => {
  const path = 'genre/movie/list';
  return fetcher({ path });
};
