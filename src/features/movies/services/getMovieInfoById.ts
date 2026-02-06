import { fetcher } from '@/services/fetcher';

export const getMovieInfoById = (id: string) => {
  const path = `movie/${id}`;
  return fetcher({ path });
};
