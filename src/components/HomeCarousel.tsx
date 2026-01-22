'use client';
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import useDevice from '@/hooks/useDevice';
import { Genre, MovieDetails, SeriesDetails } from '@/types/Types';
import { MediaInfo } from '@/shared/components';

interface Props {
  data: MovieDetails[] | SeriesDetails[];
  genres: Genre[];
  isSeries?: boolean;
}

export const HomeCarousel: React.FC<Props> = ({ data, genres, isSeries }) => {
  const { isMobile } = useDevice();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);

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
        {data.map((item) => (
          <div
            key={item.id}
            style={
              {
                '--bg-mobile': `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original${item.poster_path})`,
                '--bg-desktop': `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${item.backdrop_path})`,
              } as React.CSSProperties & {
                '--bg-mobile': string;
                '--bg-desktop': string;
              }
            }
            className="embla__slide relative h-full w-full flex-[0_0_100%] bg-[image:var(--bg-mobile)] bg-contain bg-center bg-no-repeat md:bg-[image:var(--bg-desktop)] md:bg-cover"
          >
            <MediaInfo data={item} genres={genres} isSeries={isSeries} />
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
