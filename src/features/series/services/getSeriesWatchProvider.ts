import { fetcher } from '@/shared/services/fetcher';

export const getSeriesWatchProvider = (seriesId: string | number) => {
  const path = `tv/${seriesId}/watch/providers`;
  return fetcher({ path });
};
