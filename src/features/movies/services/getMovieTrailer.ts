import { fetcher } from '@/shared/services/fetcher';

export const getOneMovieTrailer = (id: number, isSeries?: boolean) => {
  const path = isSeries ? `tv/${id}/videos` : `movie/${id}/videos`;
  const query = 'append_to_response=videos';
  return fetcher({ path, query });
};
