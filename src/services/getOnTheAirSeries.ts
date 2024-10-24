import { fetcher } from './fetcher';

export const getOnTheAirSeries = (page?: number) => {
  const path = 'tv/on_the_air';
  return fetcher({ path, page });
};
