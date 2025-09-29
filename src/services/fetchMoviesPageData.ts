import { paths } from '@/constants/constants';
import { getMovies, getMoviesGenres } from './index';

export async function fetchMoviesPageData() {
  const { results: trendingMovies } = await getMovies({
    path: paths.trendingMovies,
  });
  const { genres } = await getMoviesGenres();
  const { results: upcomingMovies } = await getMovies({
    path: paths.upcomingMovies,
  });
  const { results: topRatedMovies } = await getMovies({
    path: paths.topRatedMovies,
  });
  const { results: todaysTrendingMovies } = await getMovies({
    path: paths.todaysTrendingovies,
  });

  return {
    trendingMovies,
    genres,
    upcomingMovies,
    topRatedMovies,
    todaysTrendingMovies,
  };
}
