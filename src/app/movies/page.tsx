import { Footer, GenresMenu, HomeCarousel, Slider } from '@/components';
import { paths } from '@/constants/constants';
import { getMoviesGenres, getMovies } from '@/services';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watchly - Movies',
  description:
    'Explore the latest movies, top-rated films, and upcoming releases. Dive into the world of movies with Watchly!',
};

export default async function MoviesPage() {
  const { results: trendingMovies } = await getMovies({
    path: paths.trendingMovies,
  });
  const { genres } = await getMoviesGenres();
  const { results: upcomingMovies } = await getMovies({
    path: paths.upcomingMovies,
  });
  const { results: topRatedMovies } = await getMovies({
    path: paths.topRatedMovies,
  });
  const { results: todaysTrendingMovies } = await getMovies({
    path: paths.todaysTrendingovies,
  });

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
