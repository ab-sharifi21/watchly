import { getMovieCollection } from '@/features/movies/services';
import { Metadata } from 'next';
import Image from 'next/image';
import { VerticalMediaCard } from '@/shared/components';
import { titleFont } from '@/lib/fonts';
import { MovieDetails } from '@/shared/types';

export const metadata: Metadata = {
  title: 'Watchly - Collection Details',
  description: 'Details of the selected movie collection',
};

interface CollectionsPageProps {
  params: {
    id: string;
  };
}

async function CollectionsPage({ params }: CollectionsPageProps) {
  const { id } = params;
  const collection = await getMovieCollection({ path: `collection/${id}` });

  return (
    <section className="relative min-h-screen">
      {/* Backdrop */}
      {collection.backdrop_path && (
        <div className="absolute inset-0 -z-10 h-[80vh] w-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${collection.backdrop_path}`}
            alt={collection.name}
            fill
            className="h-full w-full object-cover object-top opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        </div>
      )}

      <div className="container mx-auto px-4 pt-[30vh] md:pt-[40vh]">
        <h1
          className={`${titleFont.className} mb-2 text-xl font-bold text-white md:text-2xl`}
        >
          {collection.name}
        </h1>
        <p className="mb-8 max-w-4xl text-base text-slate-200">
          {collection.overview}
        </p>

        {/* Movies in Collection */}
        <h2 className="mb-4 text-xl font-semibold text-white">
          {collection.parts.length} movie
          {collection.parts.length !== 1 ? 's' : ''} in this collection
        </h2>
        <div className="flex flex-wrap gap-6">
          {collection.parts.map((movie: MovieDetails) => (
            <VerticalMediaCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CollectionsPage;
