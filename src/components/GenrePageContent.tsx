'use client';

import { useCallback } from 'react';
import { getMoviesByGenreId } from '@/services';
import { MovieDetails } from '@/types/Types';
import { VerticalMovieCard } from './VerticalMovieCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { AnimatedLoader } from './AnimatedLoader';

interface GenrePageContentProps {
  genreId: number;
}

export const GenrePageContent = ({ genreId }: GenrePageContentProps) => {
  // Create the fetch function that the hook will use
  const fetchMovies = useCallback(
    async (page: number): Promise<MovieDetails[]> => {
      const { results } = await getMoviesByGenreId(genreId, page);
      return results;
    },
    [genreId],
  );

  const { data, loading } = useInfiniteScroll(fetchMovies);

  return (
    <section className="flex flex-wrap items-center justify-around gap-4 px-4">
      {data.map((movie: MovieDetails) => {
        return <VerticalMovieCard key={movie.id} data={movie} />;
      })}
      {loading && (
        <AnimatedLoader containerClassName="mt-4" />
      )}
    </section>
  );
};
