import { tmdbApiEndpoints } from '@/shared/constants/constants';
import { getSeries } from '@/features/series/services';
import {
  getMovieCollection,
  getMovies,
  getMoviesGenres,
} from '@/features/movies/services';

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

  const collectionIds = [
    86311, 263, 556, 748, 10, 119, 121938, 2344, 328, 1241, 435259, 645, 87359,
    9485, 84, 1575, 5039, 8091, 528,
  ];

  const movieCollections = await Promise.all(
    collectionIds.map((id) => getMovieCollection({ path: `collection/${id}` })),
  );

  return {
    trendingMovies,
    genres,
    topRatedMovies,
    upcomingMovies,
    popularSeries,
    airingTodaySeries,
    topRatedSeries,
    todaysTrendingMovies,
    movieCollections,
  };
}
