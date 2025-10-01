import { paths } from '@/constants/constants';
import { getMoviesGenres, getSeries } from './index';

export async function fetchSeriesPageData() {
  const { results: popularSeries } = await getSeries({
    path: paths.popularSeries,
  });
  const { genres } = await getMoviesGenres();
  const { results: airingTodaySeries } = await getSeries({
    path: paths.airingTodaySeries,
  });
  const { results: topRatedSeries } = await getSeries({
    path: paths.topRatedSeries,
  });
  const { results: onTheAirSeries } = await getSeries({
    path: paths.onTheAirSeries,
  });

  return {
    genres,
    popularSeries,
    airingTodaySeries,
    topRatedSeries,
    onTheAirSeries,
  };
}
