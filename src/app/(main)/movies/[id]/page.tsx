import Image from 'next/image';
import { titleFont } from '@/lib/fonts';
import {
  ActorsSlider,
  WatchProviderBadge,
  MediaInfo,
} from '@/shared/components';
import {
  getMovieInfoById,
  getMovieActorsById,
  getMovieWatchProviders,
} from '@/features/movies/services';
import { FlateratedProvider } from '@/shared/types/Types';

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
        style={
          {
            '--bg-mobile': `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original${poster_path})`,
            '--bg-desktop': `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          } as React.CSSProperties & {
            '--bg-mobile': string;
            '--bg-desktop': string;
          }
        }
        className="relative h-[70vh] w-full bg-[image:var(--bg-mobile)] bg-contain bg-center bg-no-repeat md:h-screen md:bg-[image:var(--bg-desktop)] md:bg-cover"
      >
        <MediaInfo data={movieInfo} genres={genres} />
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
            {watchProviders.ES?.flatrate?.map(
              (provider: FlateratedProvider) => (
                <WatchProviderBadge
                  key={provider.provider_id}
                  providerName={provider.provider_name}
                />
              ),
            )}
            {watchProviders.ES?.rent?.map((provider: FlateratedProvider) => (
              <WatchProviderBadge
                key={provider.provider_id}
                providerName={provider.provider_name}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
