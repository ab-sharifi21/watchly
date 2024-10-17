'use client';
import { formatDate } from '@/lib/utils';
import { MovieDetails } from '@/types/Types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoPlayCircleOutline } from 'react-icons/io5';

interface Props {
  movie: MovieDetails;
}

export const SlideItem: React.FC<Props> = ({ movie }) => {
  const releaseDate = formatDate(movie.release_date);
  return (
    <article className="embla__slide relative h-[230px] w-[160px] flex-none rounded-lg group cursor-pointer">
      <Link href={`/movies/${movie.id}`}>
        <Image
          width={160}
          height={230}
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={`${movie.title}'s poster`}
          className="h-full w-full rounded-lg object-cover"
        />
      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-black"></div>
      <div className="absolute bottom-0 left-0 p-4">
        <p className="text-sm font-semibold text-slate-100">{movie.title}</p>
        <p className="text-xs text-slate-300">{releaseDate}</p>
      </div>
      <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform text-slate-300 group-hover:block">
          <IoPlayCircleOutline className="h-12 w-12 transition-all duration-300 hover:scale-110" />
        </div>
      </Link>
    </article>
  );
};
