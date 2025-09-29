import { fetcher } from '../fetcher';

export const getMoviesGenres = () => {
  const path = 'genre/movie/list';
  return fetcher({ path });
};

export const getSeriesGenres = () => {
  const path = 'genre/tv/list';
  return fetcher({ path });
};
