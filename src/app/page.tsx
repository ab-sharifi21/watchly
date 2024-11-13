import { Footer, HomeCarousel, Slider } from '@/components';
import {
  getAiringTodaySeries,
  getMoviesGenres,
  getPopularSeries,
  getTopRatedSeries,
  getMovies,
} from '@/services';

export default async function LandingHomePage() {
  const { results: trendingMovies } = await getMovies({ path: "trending/movie/week" });
  const { genres } = await getMoviesGenres();
  const { results: topRatedMovies } = await getMovies({
    path: 'movie/top_rated',
  });
  const { results: upcomingMovies } = await getMovies({ path: "movie/upcoming" });
  const { results: popularSeries } = await getPopularSeries();
  const { results: airingTodaySeries } = await getAiringTodaySeries();
  const { results: topRatedSeries } = await getTopRatedSeries();
  const { results: todaysTrendingMovies } = await getMovies({ path: "trending/movie/day" });

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
