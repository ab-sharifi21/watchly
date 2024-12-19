import { ActorsSlider, MovieInfo } from '@/components';
import { titleFont } from '@/lib/fonts';
import {
  getMovieActorsById,
  getMovieInfoById,
  getMovieWatchProviders,
} from '@/services';
import { FlateratedProvider } from '@/types/Types';
import Image from 'next/image';

interface Props {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({ params }: Props) => {
  const { id } = params;
  const { original_title } = await getMovieInfoById(id);
  return {
    title: `Watchly - ${original_title}`,
    description: `${original_title}'s information page`,
  };
};

export default async function MoviePage({ params }: Props) {
  const { id } = params;

  const movieInfo = await getMovieInfoById(id);
  const { backdrop_path, genres, poster_path, title } = movieInfo;
  const { cast: movieActors } = await getMovieActorsById(id);
  const { results: watchProviders } = await getMovieWatchProviders(id);

  return (
    <>
      <section
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
        }}
        className={`bg-no-repeat} relative h-[70vh] w-full bg-cover md:h-screen`}
      >
        <MovieInfo data={movieInfo} genres={genres} />
        <Image
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          height={230}
          width={220}
          alt={`${title}' poster`}
          className="absolute bottom-4 right-4 hidden h-[250px] w-[200px] rounded-lg md:right-8 md:block md:h-[270px] md:w-[210px]"
        />
      </section>
      <ActorsSlider actors={movieActors} />
      {watchProviders.ES && (
        <section>
          <h3
            className={`${titleFont.className} mb-3 px-2 text-2xl font-semibold`}
          >
            Where to watch:{' '}
          </h3>
          <div className="flex flex-wrap gap-4 px-2">
            {watchProviders.ES.flatrate.map((provider: FlateratedProvider) => (
              <span
                key={provider.provider_name}
                className="rounded-lg border border-primary-color px-4 py-2 text-sm font-semibold duration-300 hover:cursor-pointer hover:bg-secondary-color hover:text-black"
              >
                {provider.provider_name}
              </span>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
