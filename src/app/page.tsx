import { Slider } from '@/components';
import MainCarousel from '@/components/MainCarousel';
import { getMoviesGenres } from '@/services/getMovieGenres';
import { getTopRatedMovies } from '@/services/getTopRatedMovies';
import { getTrendingMovies } from '@/services/getTrendingMovies';
import { getUpcomingMovies } from '@/services/getUpcomingMovies';

export default async function LandingHomePage() {
  const { results: trendingMovies } = await getTrendingMovies();
  const { genres } = await getMoviesGenres();
  const { results: topRatedMovies } = await getTopRatedMovies();
  const { results: upcomingMovies } = await getUpcomingMovies();

  return (
    <div className="">
      <MainCarousel movies={trendingMovies} genres={genres} />
      <Slider
        movies={upcomingMovies}
        title="Up coming movies"
        path="/upcoming-movies"
      />
      <Slider
        movies={topRatedMovies}
        title="Top rated movies"
        path="/top-movies"
      />
    </div>
  );
}
