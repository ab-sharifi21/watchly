import { fetcher } from './fetcher';

export const getMovieInfoById = (id: string) => {
  const path = `movie/${id}`;
  return fetcher({ path });
};
