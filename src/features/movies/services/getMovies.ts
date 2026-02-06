import { fetcher } from '@/services/fetcher';

export const getMovies = ({ path, page }: { path: string; page?: number }) => {
  return fetcher({ path, page });
};
