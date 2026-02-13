import { Metadata } from 'next';
import { GenresMenu, HomeCarousel, Slider } from '@/shared/components';
import { fetchSeriesPageData } from '@/features/series/services';

export const metadata: Metadata = {
  title: 'Watchly - Series',
  description:
    'Explore the latest series, top-rated shows, and series airing today. Dive into the world of series with Watchly!',
};

export default async function SeriesPage() {
  const {
    genres,
    popularSeries,
    airingTodaySeries,
    topRatedSeries,
    onTheAirSeries,
  } = await fetchSeriesPageData();

  return (
    <>
      <HomeCarousel data={popularSeries} genres={genres} isSeries />
      <GenresMenu isSeries />
      <Slider
        data={airingTodaySeries}
        title="Check out the series airing today"
        path="/series/airing-today"
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
        path="/series/on-air"
        isSeries
      />
    </>
  );
}
