import { fetcher } from './fetcher';

export const getPopularSeries = async (page?: number) => {
  const path = 'tv/popular';
  return fetcher({ path, page });
};
