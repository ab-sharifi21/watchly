'use server';

import Image from 'next/image';
import { MediaInfo } from '@/shared/components';
import { ActorsSlider } from '@/shared/components';
import {
  getSeriesInfoById,
  getSeriesWatchProvider,
} from '@/features/series/services';
import { getSeriesActorsById } from '@/features/series/services';
import { FlateratedProvider } from '@/shared/types/Types';
import { titleFont } from '@/lib/fonts';

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
        <MediaInfo data={seriesInfo} genres={genres} isSeries />
        <Image
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          height={230}
          width={220}
          alt={`${original_name}' poster`}
          className="absolute bottom-4 right-4 hidden h-[250px] w-[200px] rounded-lg md:right-8 md:block md:h-[270px] md:w-[210px]"
        />
      </section>
      <ActorsSlider actors={seriesActors} />
      {watchProviders.ES && (
        <section>
          <h3
            className={`${titleFont.className} mb-3 px-4 text-2xl font-semibold`}
          >
            Where to watch:{' '}
          </h3>
          <div className="flex flex-wrap gap-4 px-4">
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
