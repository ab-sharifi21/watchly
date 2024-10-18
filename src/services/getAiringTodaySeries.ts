import { fetcher } from './fetcher';

export const getAiringTodaySeries = async (page?: number) => {
  const path = 'tv/airing_today';
  return fetcher({ path, page });
};
