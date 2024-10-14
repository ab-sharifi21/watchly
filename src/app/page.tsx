import MainCarousel from '@/components/MainCarousel';
import { getMoviesGenres } from '@/services/getMovieGenres';
import { getUpcomingMovies } from '@/services/getUpcomingMovies';

export default async function LandingHomePage() {
  const { results } = await getUpcomingMovies();
  const { genres } = await getMoviesGenres();

  return (
    <div className="">
      <MainCarousel movies={results} genres={genres} />
    </div>
  );
}
