import { fetcher } from './fetcher';

export const getOneMovieTrailer = async (movieId: number | string) => {
  const path = `movie/${movieId}/videos`;
  const query = 'append_to_response=videos';
  return fetcher({ path, query });
};
