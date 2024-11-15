import { SeriesGenrePageContent } from '@/components';
import { getSeriesGenres } from '@/services';
import { Genre } from '@/types/Types';

interface Props {
  params: {
    genre: string;
  };
}

export const generateMetadata = ({ params }: Props) => {
  const { genre } = params;
  return {
    title: `Watchly - ${genre} series`,
    description: `Enjoy endless ${genre} series`,
  };
};

export default async function SeriesGenrePage({ params }: Props) {
  const { genre: genreName } = params;
  const { genres } = await getSeriesGenres();
  const genre = genres.find((genre: Genre) =>
    genre.name.toLowerCase().includes(genreName),
  );
  const { id: genreId } = genre;

  return (
    <>
      <main className="">
        <h1 className="mb-4 ml-4 mt-16 text-2xl font-bold text-primary-color">
          Dive into nonstop {genreName} series!
        </h1>
        <SeriesGenrePageContent genreId={genreId} />
      </main>
    </>
  );
}
