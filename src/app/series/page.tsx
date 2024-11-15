import { GenresMenu, HomeCarousel, Slider } from '@/components';
import { paths } from '@/constants/constants';
import { getMoviesGenres, getSeries } from '@/services';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watchly - Series',
  description:
    'Explore the latest series, top-rated shows, and series airing today. Dive into the world of series with Watchly!',
};

export default async function SeriesPage() {
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

  return (
    <>
      <HomeCarousel data={popularSeries} genres={genres} isSeries />
      <GenresMenu isSeries />
      <Slider
        data={airingTodaySeries}
        title="Check out the series airing today"
        path="/series/airing-today-series"
        isSeries
      />
      <Slider
        data={topRatedSeries}
        title="Dive into the top-rated shows"
        path="/series/top-series"
        isSeries
        useHorizontalCard
      />
      <Slider
        data={onTheAirSeries}
        title="Experience live entertainment!"
        path="/series/on-air-series"
        isSeries
      />
    </>
  );
}
