import { tmdbApiEndpoints } from '@/shared/constants/constants';
import { getMoviesGenres, getMovies } from '@/features/movies/services';

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

  return {
    trendingMovies,
    genres,
    upcomingMovies,
    topRatedMovies,
    todaysTrendingMovies,
  };
}
