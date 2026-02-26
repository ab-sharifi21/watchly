import { fetcher } from '@/shared/services/fetcher';

export const getMovieCollection = ({ path }: { path: string }) => {
  return fetcher({ path });
};
