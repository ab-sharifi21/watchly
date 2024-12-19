'use client';
import { ActorDetails } from '@/types/Types';
import Image from 'next/image';
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { titleFont } from '@/lib/fonts';

interface Props {
  actors: ActorDetails[];
}

export const ActorsSlider: React.FC<Props> = ({ actors }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true });

  return (
    <section className="my-8">
      <h3 className={`${titleFont.className} px-2 text-2xl font-semibold`}>Get to know the actors:</h3>
      <div className="embla mt-4 overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-5">
          {actors
            .filter((actor) => actor.profile_path !== null)
            .map((actor, index) => (
              <article
                key={index}
                className="flex flex-none flex-col items-center"
              >
                <Image
                  width={150}
                  height={150}
                  src={`https://image.tmdb.org/t/p/w342${actor.profile_path}`}
                  alt={`${actor.name}'s photo`}
                  className="h-[150px] w-[150px] rounded-full object-cover"
                />
                <div className="w-full text-center">
                  <p className="text-center text-sm font-semibold">
                    {actor.name}
                  </p>
                  <p className="text-xs text-slate-400">{actor.character}</p>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
};
