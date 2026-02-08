import { fetcher } from '@/shared/services/fetcher';

export const getMovieInfoById = (id: string) => {
  const path = `movie/${id}`;
  return fetcher({ path });
};
