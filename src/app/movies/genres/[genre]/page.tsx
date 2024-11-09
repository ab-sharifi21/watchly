import { Footer, GenrePageContent } from '@/components';
import { getMoviesGenres } from '@/services';
import { Genre } from '@/types/Types';

interface Props {
  params: {
    genre: string;
  };
}

export const generateMetadata = async ({ params }: Props) => {
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
      <main className="">
        <h1 className="mb-4 ml-4 mt-16 text-2xl font-bold text-primary-color">
          Dive into nonstop {genreName} entertainment!
        </h1>
        <GenrePageContent genreId={genreId} />
      </main>
      <Footer />
    </>
  );
}