import { fetcher } from './fetcher';

export const getSeriesInfoById = (id: string) => {
  const path = `tv/${id}`;
  return fetcher({ path });
};
