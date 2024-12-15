import Image from 'next/image';
import { ActorsSlider, MovieInfo } from '@/components';
import { getSeriesActorsById, getSeriesInfoById, getSeriesWatchProvider } from '@/services';
import { FlateratedProvider } from '@/types/Types';

interface Props {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({ params }: Props) => {
  const { id } = params;
  const { original_name } = await getSeriesInfoById(id);
  return {
    title: `Watchly - ${original_name}`,
    description: `${original_name}'s information page`,
  };
};

export default async function SeriesPage({ params }: Props) {
  const { id } = params;
  const seriesInfo = await getSeriesInfoById(id);
  const { backdrop_path, genres, poster_path, original_name } = seriesInfo;
  const { cast: seriesActors } = await getSeriesActorsById(id);
  const { results: watchProviders } = await getSeriesWatchProvider(id);
  const { ES } = watchProviders;

  return (
    <>
      <section
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
        }}
        className={`bg-no-repeat} relative h-[70vh] w-full bg-cover md:h-screen`}
      >
        <MovieInfo data={seriesInfo} genres={genres} isSeries />
        <Image
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          height={230}
          width={220}
          alt={`${original_name}' poster`}
          className="absolute bottom-4 right-4 hidden h-[250px] w-[200px] rounded-lg md:right-8 md:block md:h-[270px] md:w-[210px]"
        />
      </section>
      <ActorsSlider actors={seriesActors} />
      <section>
        <h3 className="px-4 text-2xl mb-3 font-semibold">Where to watch: </h3>
        <div className="flex flex-wrap gap-4 px-4">
          {ES.flatrate.map((provider: FlateratedProvider) => (
            <span
              key={provider.provider_name}
              className="rounded-lg border px-4 py-2 text-sm font-semibold border-primary-color hover:bg-secondary-color duration-300 hover:text-black hover:cursor-pointer"
            >
              {provider.provider_name}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
