import { fetcher } from './fetcher';

export const getTopRatedSeries = (page?: number) => {
  const path = 'tv/top_rated';
  return fetcher({ path, page });
};
