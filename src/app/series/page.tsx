import { Footer, GenresMenu, HomeCarousel, Slider } from '@/components';
import {
  getAiringTodaySeries,
  getMoviesGenres,
  getOnTheAirSeries,
  getPopularSeries,
  getTopRatedSeries,
} from '@/services';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watchly - Series',
  description:
    'Explore the latest series, top-rated shows, and series airing today. Dive into the world of series with Watchly!',
};

export default async function SeriesPage() {
  const { results: trendingSeries } = await getPopularSeries();
  const { genres } = await getMoviesGenres();
  const { results: airingTodaySeries } = await getAiringTodaySeries();
  const { results: topRatedSeries } = await getTopRatedSeries();
  const { results: onTheAirSeries } = await getOnTheAirSeries();

  return (
    <>
      <HomeCarousel data={trendingSeries} genres={genres} isSeries />
      <GenresMenu isSeries />
      <Slider
        data={airingTodaySeries}
        title="Check out the series airing today"
        path="/airing-today-series"
        isSeries
      />
      <Slider
        data={topRatedSeries}
        title="Dive into the top-rated shows"
        path="/top-series"
        isSeries
        useHorizontalCard
      />
      <Slider
        data={onTheAirSeries}
        title="Experience live entertainment!"
        path="/on-air-series"
        isSeries
      />
      <Footer />
    </>
  );
}
