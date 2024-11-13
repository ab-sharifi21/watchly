import { Footer, HomeCarousel, Slider } from '@/components';
import {
  getAiringTodaySeries,
  getMoviesGenres,
  getPopularSeries,
  getTodaysTrendingMovies,
  getTopRatedMovies,
  getTopRatedSeries,
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
  const { results: topRatedSeries } = await getTopRatedSeries();
  const { results: todaysTrendingMovies } = await getTodaysTrendingMovies();

  return (
    <div className="">
      <HomeCarousel data={trendingMovies} genres={genres} />
      <Slider
        data={upcomingMovies}
        title="Exciting upcoming movies await!"
        path="movies/upcoming-movies"
      />
      <Slider
        data={topRatedSeries}
        title="Dive into the top-rated shows"
        path="/top-series"
        isSeries
        useHorizontalCard
      />
      <Slider
        data={topRatedMovies}
        title="Uncover the best-rated movies!"
        path="movies/top-movies"
      />
      <Slider
        data={popularSeries}
        title="Check out popular series everyone is talking about"
        path="/popular-series"
        isSeries
        useHorizontalCard
      />
      <Slider
        data={todaysTrendingMovies}
        title="Catch today's trending movies"
        path="movies/trending-movies"
      />
      <Slider
        data={airingTodaySeries}
        title="Check out the series airing today"
        path="/airing-today-series"
        isSeries
        useHorizontalCard
      />
      <Footer />
    </div>
  );
}
