import { fetcher } from './fetcher';

export const getSeriesByName = ({
  path,
  query,
}: {
  path: string;
  query?: string;
}) => {
  return fetcher({ path, query });
};
