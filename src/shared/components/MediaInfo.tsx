'use client';

import { formatDate } from '@/lib/utils';
import {
  DetailedMovie,
  Genre,
  MovieDetails,
  SeriesDetails,
} from '@/types/Types';
import { CiCalendar, CiClock2 } from 'react-icons/ci';
import { MdOutlineStar } from 'react-icons/md';
import { getOneMovieGenres } from '@/features/movies/services';
import { titleFont } from '@/lib/fonts';
import { MediaActionButtons, Trailer, SeeMoreLink } from '@/shared/components';

interface MediaInfoProps {
  data: MovieDetails | SeriesDetails | DetailedMovie;
  genres: Genre[];
  isSeries?: boolean;
}

export const MediaInfo = ({ data, genres, isSeries }: MediaInfoProps) => {
  const releaseDate = formatDate(
    !isSeries
      ? ((data as MovieDetails) || (data as DetailedMovie)).release_date
      : (data as SeriesDetails).first_air_date,
  );

  const movieGenres = getOneMovieGenres(
    ((data as MovieDetails) || (data as MovieDetails)).genre_ids,
    genres,
  );

  return (
    <section className="absolute bottom-12 px-4 md:bottom-20 md:px-8">
      <h2
        className={`${titleFont.className} text-2xl font-semibold lg:text-3xl`}
      >
        {!isSeries
          ? (data as MovieDetails).title
          : (data as SeriesDetails).name}
      </h2>

      <div className="my-2 flex gap-2">
        <div className="flex place-items-center gap-1">
          <span className="rounded bg-primary-color px-1 font-semibold">
            IMDb
          </span>{' '}
          <span className="flex place-items-center gap-1">
            {data.vote_average.toFixed(1)}{' '}
            <MdOutlineStar className="h-4 w-4 text-secondary-color" />
          </span>
          <span className="text-sm text-slate-400 lg:text-[1rem]">
            ({data.vote_count})
          </span>
        </div>
        {movieGenres.length > 0
          ? movieGenres.map((genre) => (
              <p key={genre.id} className="text-sm lg:text-[1rem]">
                <span className="text-lg text-slate-400">|</span> {genre.name}
              </p>
            ))
          : genres.slice(0, 2).map((genre) => (
              <p key={genre.id} className="text-sm lg:text-[1rem]">
                <span className="text-lg text-slate-400">|</span> {genre.name}
              </p>
            ))}
      </div>

      <p className="line-clamp-5 max-w-full text-sm md:line-clamp-none md:max-w-[500px] lg:max-w-[800px] lg:text-[16px]">
        {data.overview}
      </p>
      <SeeMoreLink id={data.id} isSeries={isSeries} />

      <div className="my-3">
        <MediaActionButtons
          mediaId={data.id}
          mediaType={isSeries ? 'tv' : 'movie'}
          title={
            !isSeries
              ? (data as MovieDetails).title
              : (data as SeriesDetails).name
          }
          posterPath={data.poster_path}
        />
      </div>

      <div className="my-2 flex flex-col gap-0 md:flex-row md:gap-4">
        <span className="flex place-items-center gap-1 text-sm text-slate-400">
          <CiCalendar className="text-normal h-5 w-5 text-primary-color" />{' '}
          {releaseDate}
        </span>
        {(data as DetailedMovie).runtime && (
          <span className="flex place-items-center gap-1 text-sm text-slate-400">
            <CiClock2 className="text-normal h-5 w-5 text-primary-color" />{' '}
            {(data as DetailedMovie).runtime} mins
          </span>
        )}
      </div>
      <Trailer id={data.id} isSeries={isSeries} />
    </section>
  );
};
