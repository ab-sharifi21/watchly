'use client';
import { formatDate } from '@/lib/utils';
import { MovieDetails, SeriesDetails } from '@/types/Types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoPlayCircleOutline } from 'react-icons/io5';

interface Props {
  data: MovieDetails | SeriesDetails;
  isSeries?: boolean;
}

export const VerticalMovieCard: React.FC<Props> = ({ data, isSeries }) => {
  const releaseDate = formatDate(
    isSeries
      ? (data as SeriesDetails).first_air_date
      : (data as MovieDetails).release_date,
  );
  return (
    <article className="embla__slide group relative h-[230px] w-[160px] flex-none rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.4)]">
      <Link
        href={isSeries ? `/series/${data.id}` : `/movies/${data.id}`}
        className="block h-full w-full cursor-pointer"
      >
        {/* Rating Badge */}
        {data.vote_average > 0 && (
          <div className="absolute right-2 top-2 z-20 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 backdrop-blur-sm transition-all duration-300 group-hover:bg-primary-color">
            <span className="text-xs font-bold text-white">★</span>
            <span className="text-xs font-semibold text-white">
              {data.vote_average.toFixed(1)}
            </span>
          </div>
        )}

        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <Image
            width={160}
            height={230}
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            alt={`${isSeries ? (data as SeriesDetails).name : (data as MovieDetails).title}'s poster`}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
          />

          {/* Shine effect on hover */}
          <div className="absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100"></div>
        </div>

        {/* Bottom gradient - always visible */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 rounded-b-xl bg-gradient-to-t from-black via-black/80 to-transparent"></div>

        {/* Top gradient - appears on hover */}
        <div className="absolute inset-x-0 top-0 h-1/3 rounded-t-xl bg-gradient-to-b from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        <div className="absolute bottom-0 left-0 right-0 p-3 transition-all duration-300">
          <p className="line-clamp-2 text-sm font-bold text-white drop-shadow-lg">
            {isSeries
              ? (data as SeriesDetails).name
              : (data as MovieDetails).title}
          </p>
          <p className="mt-1 text-xs font-medium text-slate-300">
            {releaseDate}
          </p>
        </div>

        {/* Play button inside Link */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-color/90 shadow-2xl backdrop-blur-sm">
            <IoPlayCircleOutline className="h-10 w-10 text-white" />
          </div>
        </div>
      </Link>
    </article>
  );
};
