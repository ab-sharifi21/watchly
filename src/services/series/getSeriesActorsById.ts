import { fetcher } from '../fetcher';

export const getSeriesActorsById = (seriesId: string | number) => {
  const path = `tv/${seriesId}/credits`;
  return fetcher({ path });
};
