'use client';
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import useDevice from '@/hooks/useDevice';
import { Genre, MovieDetails, SeriesDetails } from '@/types/Types';
import { MovieInfo } from './MovieInfo';

interface Props {
  data: MovieDetails[] | SeriesDetails[];
  genres: Genre[];
  isSeries?: boolean;
}

export const HomeCarousel: React.FC<Props> = ({ data, genres, isSeries }) => {
  const { isMobile } = useDevice();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const imageURL = isMobile
    ? process.env.NEXT_PUBLIC_IMAGE_BASE_URL_MOBILE
    : process.env.NEXT_PUBLIC_IMAGE_BASE_URL_DESKTOP;

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section
      className={`embla relative overflow-hidden ${isMobile ? 'h-[70vh]' : 'h-screen'} w-full overflow-hidden`}
      ref={emblaRef}
    >
      <div className="embla__container flex h-full w-full">
        {data.map((data) => (
          <div
            key={data.id}
            className="embla__slide relative h-full w-full flex-[0_0_100%]"
          >
            <img
              src={`${imageURL}${data.backdrop_path}`}
              alt={
                !isSeries
                  ? (data as MovieDetails).title
                  : (data as SeriesDetails).name
              }
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
            <MovieInfo data={data} genres={genres} isSeries={isSeries} />
          </div>
        ))}
      </div>
      <div className="embla__dots absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {data.map((_, index) => (
          <button
            key={index}
            className={`embla__dot ${index === selectedIndex ? 'bg-secondary-color' : 'bg-primary-color'} h-2 w-2 rounded-full`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
};
