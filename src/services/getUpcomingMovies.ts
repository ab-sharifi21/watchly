import { fetcher } from "./fetcher";

export const getUpcomingMovies = async (page?: number) => {
  const path = 'movie/upcoming';
  return fetcher({ path, page });
}