import { getTopRatedMovies } from '@/services/getTopRatedMovies';

import MainCarousel from '@/components/MainCarousel';
import { getMoviesGenres } from '@/services/getMovieGenres';

export default async function Home() {
  const { results } = await getTopRatedMovies();
  const { genres } = await getMoviesGenres();

  return (
    <div className="">
      <MainCarousel movies={results} genres={genres} />
    </div>
  );
}
