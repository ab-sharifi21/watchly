import { fetcher } from '@/services/fetcher';

export const getSeriesInfoById = (id: string) => {
  const path = `tv/${id}`;
  return fetcher({ path });
};
