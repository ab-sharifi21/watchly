import { Metadata } from 'next';
import { GenresMenu, HomeCarousel, Slider } from '@/shared/components';
import { fetchMoviesPageData } from '@/features/movies/services';

export const metadata: Metadata = {
  title: 'Watchly - Movies',
  description:
    'Explore the latest movies, top-rated films, and upcoming releases. Dive into the world of movies with Watchly!',
};

export default async function MoviesPage() {
  const {
    trendingMovies,
    genres,
    upcomingMovies,
    topRatedMovies,
    todaysTrendingMovies,
  } = await fetchMoviesPageData();

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
    </>
  );
}
