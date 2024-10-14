import { formatDate } from '@/lib/utils';
import { getOneMovieGenres } from '@/services/getOneMovieGenre';
import { Genre, MovieDetails } from '@/types/Types';
import { CiCalendar } from 'react-icons/ci';
import { MdOutlineStar } from 'react-icons/md';
import { Trailer } from './MovieTrailer';

interface MovieInfoProps {
  movie: MovieDetails;
  genres: Genre[];
}

export const MovieInfo = ({ movie, genres }: MovieInfoProps) => {
  const releaseDate = formatDate(movie.release_date);

  const movieGenres = getOneMovieGenres(movie.genre_ids, genres);
  return (
    <div className="absolute bottom-12 px-4 md:bottom-[20%] md:px-8 xl:bottom-1/4">
      <h2 className="text-2xl font-semibold">{movie.title}</h2>
      <div className="my-2 flex gap-2">
        <p className="flex place-items-center gap-1">
          <span className="rounded bg-primary-color px-1 font-semibold">
            IMDb
          </span>{' '}
          <span className="flex place-items-center">
            {movie.vote_average.toFixed(1)}{' '}
            <MdOutlineStar className="h-3 w-3" />
          </span>
          <span className="text-sm text-slate-400">({movie.vote_count})</span>
        </p>
        {movieGenres.map((genre) => (
          <p key={genre.id} className="text-sm">
            <span className="text-lg text-slate-400">|</span> {genre.name}
          </p>
        ))}
      </div>
      <p className="max-w-[400px] text-sm md:max-w-[650px] lg:max-w-[900px]">
        {movie.overview}
      </p>
      <p className="my-2 flex place-items-center gap-2 text-sm text-slate-400">
        <CiCalendar className="text-normal h-5 w-5 text-white" /> {releaseDate}
      </p>
      <Trailer id={movie.id} />
    </div>
  );
};
