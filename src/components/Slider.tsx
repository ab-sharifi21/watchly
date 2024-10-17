'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { MovieDetails } from '@/types/Types';
import Link from 'next/link';
import { SlideItem } from './SlideItem';


interface Props {
  movies: MovieDetails[];
  title?: string;
  path?: string;
}

export const Slider: React.FC<Props> = ({ movies, title, path }) => {
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
          <h3 className="text-2xl font-semibold">{title}</h3>
          <Link href={path}>
            <span className="duration-3000 hidden items-center text-xs text-secondary-color group-hover:flex group-hover:animate-slideIn">
              Explore more <GrFormNext className="h-5 w-5" />
            </span>
          </Link>
        </div>
      )}

      <div className="embla__viewport" ref={emblaRef}>
        <div className="flex gap-2">
          {movies.map((movie, index) => (
            <SlideItem key={index} movie={movie} />
          ))}
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
          className="rounded-full font-semibold text-primary-color"
          onClick={scrollNext}
        >
          <GrFormNext className="h-8 w-8 hover:scale-125" />
        </button>
      </div>
    </section>
  );
};
