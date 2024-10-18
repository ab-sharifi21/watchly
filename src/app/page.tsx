import { HomeCarousel, Slider } from '@/components';
import {
  getAiringTodaySeries,
  getMoviesGenres,
  getPopularSeries,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from '@/services';

export default async function LandingHomePage() {
  const { results: trendingMovies } = await getTrendingMovies();
  const { genres } = await getMoviesGenres();
  const { results: topRatedMovies } = await getTopRatedMovies();
  const { results: upcomingMovies } = await getUpcomingMovies();
  const { results: popularSeries } = await getPopularSeries();
  const { results: airingTodaySeries } = await getAiringTodaySeries();

  return (
    <div className="">
      <HomeCarousel movies={trendingMovies} genres={genres} />
      <Slider
        data={upcomingMovies}
        title="Upcoming movies"
        path="/upcoming-movies"
      />
      <Slider
        data={popularSeries}
        title="Popular series"
        path="/popular-series"
        isSeries
      />
      <Slider
        data={topRatedMovies}
        title="Top rated movies"
        path="/top-movies"
      />
      <Slider
        data={airingTodaySeries}
        title="Series airing today"
        path="/airing-today-series"
        isSeries
      />
    </div>
  );
}
