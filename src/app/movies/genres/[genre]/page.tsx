import { Footer, VerticalMovieCard } from '@/components';
import { getMoviesByGenreId, getMoviesGenres } from '@/services';
import { Genre, MovieDetails } from '@/types/Types';

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
  const { results: movies } = await getMoviesByGenreId(genreId);

  return (
    <>
      <main className="">
        <h1 className="mb-4 ml-4 mt-16 text-2xl font-bold">
          Enjoy endless {genreName} movies!
        </h1>
        <section className="flex flex-wrap items-center justify-around gap-4 px-4">
          {movies.map((movie: MovieDetails) => {
            return <VerticalMovieCard key={movie.id} data={movie} />;
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
