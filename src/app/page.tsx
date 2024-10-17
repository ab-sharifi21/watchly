import { Slider } from '@/components';
import MainCarousel from '@/components/MainCarousel';
import { getMoviesGenres } from '@/services/getMovieGenres';
import { getTopRatedMovies } from '@/services/getTopRatedMovies';
import { getUpcomingMovies } from '@/services/getUpcomingMovies';

export default async function LandingHomePage() {
  const { results: upcomingMovies } = await getUpcomingMovies();
  const { genres } = await getMoviesGenres();
  const { results: topRatedMovies } = await getTopRatedMovies();

  return (
    <div className="">
      <MainCarousel movies={upcomingMovies} genres={genres} />
      <Slider
        movies={topRatedMovies}
        title="Top rated movies"
        path="/top-movies"
      />
    </div>
  );
}
