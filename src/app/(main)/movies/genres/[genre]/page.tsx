import { MovieGenrePageContent } from '@/features/movies/components';
import { titleFont } from '@/lib/fonts';
import { getMoviesGenres } from '@/features/movies/services';
import { Genre } from '@/types/Types';

interface Props {
  params: {
    genre: string;
  };
}

export const generateMetadata = ({ params }: Props) => {
  const { genre } = params;
  return {
    title: `Watchly - ${genre}`,
    description: `Enjoy endless ${genre} movies`,
  };
};

export default async function GenrePage({ params }: Props) {
  const { genre: genreName } = params;

  const { genres } = await getMoviesGenres();
  const genre = genres.find(
    (genre: Genre) => genre.name.toLowerCase() === genreName,
  );
  const { id: genreId } = genre;

  return (
    <>
      <h1
        className={`${titleFont.className} mb-4 ml-4 mt-16 text-slate-400 lg:text-lg`}
      >
        Dive into nonstop {genreName} entertainment!
      </h1>
      <MovieGenrePageContent genreId={genreId} />
    </>
  );
}
