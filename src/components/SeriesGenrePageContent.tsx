'use client';

import { useCallback } from 'react';
import { VerticalMovieCard } from './VerticalMovieCard';
import { SeriesDetails } from '@/types/Types';
import { getSeriesByGenreId } from '@/services';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { AnimatedLoader } from './AnimatedLoader';

interface Props {
  genreId: number;
}

export const SeriesGenrePageContent = ({ genreId }: Props) => {
  const fetchSeries = useCallback(async () => {
    const { results } = await getSeriesByGenreId(genreId);
    return results;
  }, [genreId]);

  const { data, loading } = useInfiniteScroll(fetchSeries);

  return (
    <section className="flex flex-wrap items-center justify-around gap-4 px-4">
      {data.map((series: SeriesDetails) => {
        return <VerticalMovieCard key={series.id} data={series} isSeries />;
      })}
      {loading && <AnimatedLoader containerClassName="mt-4" />}
    </section>
  );
};
