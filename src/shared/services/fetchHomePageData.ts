import { tmdbApiEndpoints } from '@/shared/constants/constants';
import { getSeries } from '@/features/series/services';
import { getMovies, getMoviesGenres } from '@/features/movies/services';

export async function fetchHomePageData() {
  const { results: trendingMovies } = await getMovies({
    path: tmdbApiEndpoints.trendingMovies,
  });

  const { genres } = await getMoviesGenres();

  const { results: topRatedMovies } = await getMovies({
    path: tmdbApiEndpoints.topRatedMovies,
  });

  const { results: upcomingMovies } = await getMovies({
    path: tmdbApiEndpoints.upcomingMovies,
  });

  const { results: popularSeries } = await getSeries({
    path: tmdbApiEndpoints.popularSeries,
  });

  const { results: airingTodaySeries } = await getSeries({
    path: tmdbApiEndpoints.airingTodaySeries,
  });

  const { results: topRatedSeries } = await getSeries({
    path: tmdbApiEndpoints.topRatedSeries,
  });

  const { results: todaysTrendingMovies } = await getMovies({
    path: tmdbApiEndpoints.todaysTrendingovies,
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
