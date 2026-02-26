import { tmdbApiEndpoints } from '@/shared/constants/constants';
import { getSeries } from '@/features/series/services';
import { getMoviesGenres } from '@/features/movies/services';

export async function fetchSeriesPageData() {
  const { results: popularSeries } = await getSeries({
    path: tmdbApiEndpoints.popularSeries,
  });
  const { genres } = await getMoviesGenres();
  const { results: airingTodaySeries } = await getSeries({
    path: tmdbApiEndpoints.airingTodaySeries,
  });
  const { results: topRatedSeries } = await getSeries({
    path: tmdbApiEndpoints.topRatedSeries,
  });
  const { results: onTheAirSeries } = await getSeries({
    path: tmdbApiEndpoints.onTheAirSeries,
  });

  return {
    genres,
    popularSeries,
    airingTodaySeries,
    topRatedSeries,
    onTheAirSeries,
  };
}
