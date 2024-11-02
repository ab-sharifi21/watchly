import { ActorsSlider, Footer, MovieInfo } from '@/components';
import { getSeriesActorsById, getSeriesInfoById } from '@/services';
import Image from 'next/image';

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
      <Footer />
    </>
  );
}
