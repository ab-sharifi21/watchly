import { formatDate } from '@/lib/utils';
import { Genre, MovieDetails, SeriesDetails } from '@/types/Types';
import { CiCalendar } from 'react-icons/ci';
import { MdOutlineStar } from 'react-icons/md';
import { Trailer } from './MovieTrailer';
import { getOneMovieGenres } from '@/services';

interface MovieInfoProps {
  data: MovieDetails | SeriesDetails;
  genres: Genre[];
  isSeries?: boolean;
}

export const MovieInfo = ({ data, genres, isSeries }: MovieInfoProps) => {
  const releaseDate = formatDate(
    !isSeries
      ? (data as MovieDetails).release_date
      : (data as SeriesDetails).first_air_date,
  );

  const movieGenres = getOneMovieGenres(data.genre_ids, genres);
  return (
    <section className="absolute bottom-12 px-4 md:bottom-[20%] md:px-8 xl:bottom-1/4">
      <h2 className="text-2xl font-semibold lg:text-3xl">
        {!isSeries
          ? (data as MovieDetails).title
          : (data as SeriesDetails).name}
      </h2>
      <article className="my-2 flex gap-2">
        <div className="flex place-items-center gap-1">
          <span className="rounded bg-primary-color px-1 font-semibold">
            IMDb
          </span>{' '}
          <span className="flex place-items-center">
            {data.vote_average.toFixed(1)} <MdOutlineStar className="h-3 w-3" />
          </span>
          <span className="text-sm text-slate-400 lg:text-[1rem]">
            ({data.vote_count})
          </span>
        </div>
        {movieGenres.map((genre) => (
          <p key={genre.id} className="text-sm lg:text-[1rem]">
            <span className="text-lg text-slate-400">|</span> {genre.name}
          </p>
        ))}
      </article>
      <p className="max-w-[400px] text-sm md:max-w-[650px] lg:max-w-[900px] lg:text-[16px]">
        {data.overview}
      </p>
      <p className="my-2 flex place-items-center gap-2 text-sm text-slate-400">
        <CiCalendar className="text-normal h-5 w-5 text-white" /> {releaseDate}
      </p>
      <Trailer id={data.id} />
    </section>
  );
};
