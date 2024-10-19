import { fetcher } from './fetcher';

export const getPopularSeries = (page?: number) => {
  const path = 'tv/popular';
  return fetcher({ path, page });
};
