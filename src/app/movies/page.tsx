import { Footer, HomeCarousel, Slider } from '@/components';
import {
  getMoviesGenres,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from '@/services';

export default async function MoviesPage() {
  const { results: trendingMovies } = await getTrendingMovies();
  const { genres } = await getMoviesGenres();
  const { results: upcomingMovies } = await getUpcomingMovies();
  const { results: topRatedMovies } = await getTopRatedMovies();
  const { results: todaysTrendingMovies } = await getTrendingMovies();

  return (
    <>
      <HomeCarousel data={trendingMovies} genres={genres} />
      <Slider
        data={upcomingMovies}
        title="Dive into upcoming movies"
        path="/upcoming-movies"
      />
      <Slider
        data={topRatedMovies}
        title="Best-rated movies of all time"
        path="/top-movies"
        useHorizontalCard
      />
      <Slider
        data={todaysTrendingMovies}
        title="Catch today's trending movies"
        path="/popular-series"
      />
      <Footer />
    </>
  );
}
