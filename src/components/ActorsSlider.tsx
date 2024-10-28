'use client';
import { ActorDetails } from '@/types/Types';
import Image from 'next/image';
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'

interface Props {
  actors: ActorDetails[];
}

export const ActorsSlider: React.FC<Props> = ({ actors }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true });

  return (
    <div className="embla overflow-hidden my-8" ref={emblaRef}>
      <div className="embla__container flex gap-3">
      {actors.filter((actor) => actor.profile_path !== null).map((actor, index) => (
          <div key={index} className='flex-none'>
            <Image width={150} height={150} src={`https://image.tmdb.org/t/p/w342${actor.profile_path}`} alt={`${actor.name}'s photo`} className='w-[150px] h-[150px] object-cover rounded-full' />
            <div className='w-full text-center'>
            <p className='text-center text-sm font-semibold'>{actor.name}</p>
            <p className='text-xs text-slate-400'>{actor.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
