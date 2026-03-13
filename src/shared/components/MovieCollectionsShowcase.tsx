'use client';

import React from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { MovieCollection } from '@/shared/types/movie.types';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import Link from 'next/link';

interface MovieCollectionsShowcaseProps {
  collections: MovieCollection[];
}

export const MovieCollectionsShowcase: React.FC<
  MovieCollectionsShowcaseProps
> = ({ collections }) => {
  const emblaTuple = useEmblaCarousel({
    loop: false,
    dragFree: true,
  });
  const emblaRef = emblaTuple[0];
  const emblaApi = emblaTuple[1];

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="relative w-full px-2 sm:px-0">
      <h2 className="my-4 ml-2 text-xl font-extrabold tracking-tight drop-shadow-xl">
        Author&apos;s Favorite Collections
      </h2>
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/movies/collections/${collection.id}`}
              className="embla__slide group relative flex h-[180px] w-[400px] flex-none overflow-hidden rounded-2xl border border-gray-800 bg-black/50 shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative h-full w-2/5 min-w-[160px]">
                <Image
                  src={`https://image.tmdb.org/t/p/original${collection.backdrop_path || collection.poster_path}`}
                  alt={collection.name}
                  fill
                  className="absolute inset-0 z-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 160px"
                  priority={false}
                  unoptimized={false}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
                <span className="absolute right-2 top-2 z-20 rounded-full bg-primary-color/90 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
                  {collection.parts?.length === 1
                    ? '1 movie'
                    : `${collection.parts?.length} movies`}
                </span>
              </div>
              <div className="relative z-20 flex flex-1 flex-col justify-center gap-2 p-6">
                <h3 className="mb-1 text-xl font-bold text-white drop-shadow-lg">
                  {collection.name}
                </h3>
                <p className="line-clamp-3 rounded bg-black/30 px-2 py-1 text-sm text-gray-200">
                  {collection.overview}
                </p>
              </div>
              <div className="pointer-events-none absolute inset-0 z-30 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
            </Link>
          ))}
        </div>
      </div>
      <div className="embla__controls pointer-events-none absolute left-0 top-1/2 flex w-full justify-between">
        <button
          className="pointer-events-auto ml-2 rounded-full bg-gray-900/80 p-2 font-semibold text-primary-color shadow-lg hover:bg-gray-800"
          onClick={scrollPrev}
          aria-label="Previous"
        >
          <GrFormPrevious className="h-7 w-7" />
        </button>
        <button
          className="pointer-events-auto mr-2 rounded-full bg-gray-900/80 p-2 font-semibold text-primary-color shadow-lg hover:bg-gray-800"
          onClick={scrollNext}
          aria-label="Next"
        >
          <GrFormNext className="h-7 w-7" />
        </button>
      </div>
    </section>
  );
};

export default MovieCollectionsShowcase;
