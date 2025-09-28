'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { MovieDetails, SeriesDetails } from '@/types/Types';
import Link from 'next/link';
import { VerticalMovieCard } from './VerticalMovieCard';
import { HorizontalMovieCard } from './HorizontalMovieCard';
import { titleFont } from '@/lib/fonts';

interface SliderProps {
  data: MovieDetails[] | SeriesDetails[];
  title?: string;
  path?: string;
  isSeries?: boolean;
  useHorizontalCard?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  data,
  title,
  path,
  isSeries,
  useHorizontalCard,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="relative my-4 w-full overflow-hidden px-2 py-4">
      {path && !useHorizontalCard && (
        <div className="group mb-2 flex cursor-pointer items-center gap-2">
          <h3
            className={`${titleFont.className} text-xl font-semibold lg:text-3xl`}
          >
            {title}
          </h3>
          <Link href={path}>
            <span className="duration-3000 hidden items-center text-xs text-secondary-color group-hover:flex group-hover:animate-slideIn">
              Explore All <GrFormNext className="h-5 w-5" />
            </span>
          </Link>
        </div>
      )}

      <div className="embla__viewport" ref={emblaRef}>
        <div className="flex gap-2">
          {useHorizontalCard && (
            <article className="embla__slide h-[170px] w-[270px] flex-none rounded-lg bg-gradient-to-b from-black to-transparent">
              <p
                className={`${titleFont.className} flex h-full w-full items-center justify-center p-2 text-xl font-semibold text-slate-400`}
              >
                {title}
              </p>
            </article>
          )}
          {data.map((item, index) =>
            useHorizontalCard ? (
              <HorizontalMovieCard
                key={index}
                data={item}
                isSeries={isSeries}
              />
            ) : (
              <VerticalMovieCard key={index} data={item} isSeries={isSeries} />
            ),
          )}
          <article
            className={`embla__slide ${!useHorizontalCard ? 'h-[230px] w-[160px]' : 'h-[170px] w-[270px]'} flex-none rounded-lg bg-gradient-to-b from-white to-transparent text-primary-color`}
          >
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
