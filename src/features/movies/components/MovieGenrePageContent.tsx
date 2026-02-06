'use client';

import { useCallback } from 'react';
import { getMoviesByGenreId } from '@/features/movies/services';
import { MovieDetails } from '@/shared/types/Types';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { AnimatedLoader, VerticalMediaCard } from '@/shared/components';

interface MovieGenrePageContentProps {
  genreId: number;
}

export const MovieGenrePageContent = ({
  genreId,
}: MovieGenrePageContentProps) => {
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
    <section className="flex flex-wrap items-center justify-center gap-4 px-4">
      {data.map((movie: MovieDetails) => {
        return <VerticalMediaCard key={movie.id} data={movie} />;
      })}
      {loading && <AnimatedLoader containerClassName="mt-4" />}
    </section>
  );
};
