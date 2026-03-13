import { collectionIds, tmdbApiEndpoints } from '@/shared/constants/constants';
import {
  getMoviesGenres,
  getMovies,
  getMovieCollection,
} from '@/features/movies/services';

export async function fetchMoviesPageData() {
  const { results: trendingMovies } = await getMovies({
    path: tmdbApiEndpoints.trendingMovies,
  });
  const { genres } = await getMoviesGenres();
  const { results: upcomingMovies } = await getMovies({
    path: tmdbApiEndpoints.upcomingMovies,
  });
  const { results: topRatedMovies } = await getMovies({
    path: tmdbApiEndpoints.topRatedMovies,
  });
  const { results: todaysTrendingMovies } = await getMovies({
    path: tmdbApiEndpoints.todaysTrendingovies,
  });

  const collections = await Promise.all(
    collectionIds.map((id) => getMovieCollection({ path: `collection/${id}` })),
  );

  return {
    trendingMovies,
    genres,
    upcomingMovies,
    topRatedMovies,
    todaysTrendingMovies,
    collections,
  };
}
