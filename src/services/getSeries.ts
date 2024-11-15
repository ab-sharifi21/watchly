import { fetcher } from './fetcher';

export const getSeries = ({ path, page }: { path: string; page?: number }) => {
  return fetcher({ path, page });
};
