import { fetcher } from './fetcher';

export const getMoviesByGenreId = (genreId: number, page?: number) => {
  const path = 'discover/movie';
  const query = `&with_genres=${genreId}`;
  return fetcher({ path, page, query });
};
