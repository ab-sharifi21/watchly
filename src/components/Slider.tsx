'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { MovieDetails, SeriesDetails } from '@/types/Types';
import Link from 'next/link';
import { VerticalMovieCard } from './VerticalMovieCard';

interface Props {
  data: MovieDetails[] | SeriesDetails[];
  title?: string;
  path?: string;
  isSeries?: boolean;
}

export const Slider: React.FC<Props> = ({ data, title, path, isSeries }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="relative w-full overflow-hidden px-2 py-4">
      {path && (
        <div className="group mb-2 flex cursor-pointer items-center gap-2">
          <h3 className="text-2xl font-semibold lg:text-3xl">{title}</h3>
          <Link href={path}>
            <span className="duration-3000 hidden items-center text-xs text-secondary-color group-hover:flex group-hover:animate-slideIn">
              Explore All <GrFormNext className="h-5 w-5" />
            </span>
          </Link>
        </div>
      )}

      <div className="embla__viewport" ref={emblaRef}>
        <div className="flex gap-2">
          {data.map((data, index) => (
            <VerticalMovieCard key={index} data={data} isSeries={isSeries} />
          ))}
          <article className="embla__slide h-[230px] w-[160px] flex-none rounded-lg bg-gradient-to-b from-white to-transparent text-primary-color">
            {path && (
              <Link
                href={path}
                className="flex h-full w-full cursor-pointer items-center justify-center font-semibold"
              >
                Explore All <GrFormNext className="h-5 w-5" />
              </Link>
            )}
          </article>
        </div>
      </div>

      <div className="embla__controls absolute top-1/2 flex w-full justify-between">
        <button
          className="rounded-full font-semibold text-primary-color"
          onClick={scrollPrev}
        >
          <GrFormPrevious className="h-8 w-8 hover:scale-125" />
        </button>
        <button
          className="mr-2 rounded-full font-semibold text-primary-color"
          onClick={scrollNext}
        >
          <GrFormNext className="h-8 w-8 hover:scale-125" />
        </button>
      </div>
    </section>
  );
};
