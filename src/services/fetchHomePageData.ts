import { paths } from '@/constants/constants';
import { getSeries } from '@/features/series/services';
import { getMovies, getMoviesGenres } from '@/features/movies/services';

export async function fetchHomePageData() {
  const { results: trendingMovies } = await getMovies({
    path: paths.trendingMovies,
  });

  const { genres } = await getMoviesGenres();

  const { results: topRatedMovies } = await getMovies({
    path: paths.topRatedMovies,
  });

  const { results: upcomingMovies } = await getMovies({
    path: paths.upcomingMovies,
  });

  const { results: popularSeries } = await getSeries({
    path: paths.popularSeries,
  });

  const { results: airingTodaySeries } = await getSeries({
    path: paths.airingTodaySeries,
  });

  const { results: topRatedSeries } = await getSeries({
    path: paths.topRatedSeries,
  });

  const { results: todaysTrendingMovies } = await getMovies({
    path: paths.todaysTrendingovies,
  });

  return {
    trendingMovies,
    genres,
    topRatedMovies,
    upcomingMovies,
    popularSeries,
    airingTodaySeries,
    topRatedSeries,
    todaysTrendingMovies,
  };
}
