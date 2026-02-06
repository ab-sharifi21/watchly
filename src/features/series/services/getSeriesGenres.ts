import { fetcher } from '@/services/fetcher';

export const getSeriesGenres = () => {
  const path = 'genre/tv/list';
  return fetcher({ path });
};
