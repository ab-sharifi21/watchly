import { fetcher } from './fetcher';

export const getMovieByName = ({
  path,
  query,
}: {
  path: string;
  query?: string;
}) => {
  return fetcher({ path, query });
};
