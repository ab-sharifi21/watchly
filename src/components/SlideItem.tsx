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

export const SlideItem: React.FC<Props> = ({ data, isSeries }) => {
  const releaseDate = formatDate(
    isSeries
      ? (data as SeriesDetails).first_air_date
      : (data as MovieDetails).release_date,
  );
  return (
    <article className="embla__slide group relative h-[230px] w-[160px] flex-none rounded-lg">
      <Link
        href={isSeries ? `/series/${data.id}` : `/movies/${data.id}`}
        className="cursor-pointer"
      >
        <Image
          width={160}
          height={230}
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          alt={`${isSeries ? (data as SeriesDetails).name : (data as MovieDetails).title}'s poster`}
          className="h-full w-full rounded-lg object-cover"
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-black"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <p className="text-sm font-semibold text-slate-100">
            {isSeries
              ? (data as SeriesDetails).name
              : (data as MovieDetails).title}
          </p>
          <p className="text-xs text-slate-300">{releaseDate}</p>
        </div>
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform text-slate-300 group-hover:block">
          <IoPlayCircleOutline className="h-12 w-12 transition-all duration-300 hover:scale-110" />
        </div>
      </Link>
    </article>
  );
};
