import { fetcher } from '../fetcher';

export const getMovieByName = ({
  path,
  query,
  page = 1,
}: {
  path: string;
  query?: string;
  page?: number;
}) => {
  return fetcher({ path, query, page });
};
