import { fetcher } from './fetcher';

export const getMovies = ({ path, page }: { path: string; page?: number }) => {
  return fetcher({ path, page });
};
