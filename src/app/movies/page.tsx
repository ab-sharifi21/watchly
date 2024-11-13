import { Footer, GenresMenu, HomeCarousel, Slider } from '@/components';
import {
  getMoviesGenres,
  getMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from '@/services';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watchly - Movies',
  description:
    'Explore the latest movies, top-rated films, and upcoming releases. Dive into the world of movies with Watchly!',
};

export default async function MoviesPage() {
  const { results: trendingMovies } = await getTrendingMovies();
  const { genres } = await getMoviesGenres();
  const { results: upcomingMovies } = await getUpcomingMovies();
  const { results: topRatedMovies } = await getMovies({
    path: 'movie/top_rated',
  });
  const { results: todaysTrendingMovies } = await getTrendingMovies();

  return (
    <>
      <HomeCarousel data={trendingMovies} genres={genres} />
      <GenresMenu />
      <Slider
        data={upcomingMovies}
        title="Dive into upcoming movies"
        path="movies/upcoming-movies"
      />
      <Slider
        data={topRatedMovies}
        title="Best-rated movies of all time"
        path="movies/top-movies"
        useHorizontalCard
      />
      <Slider
        data={todaysTrendingMovies}
        title="Catch today's trending movies"
        path="movies/trending-movies"
      />
      <Footer />
    </>
  );
}
