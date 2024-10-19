import { fetcher } from './fetcher';

export const getAiringTodaySeries = (page?: number) => {
  const path = 'tv/airing_today';
  return fetcher({ path, page });
};
