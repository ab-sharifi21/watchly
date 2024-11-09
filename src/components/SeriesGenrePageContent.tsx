'use client';

import { useEffect, useState } from 'react';
import { VerticalMovieCard } from './VerticalMovieCard';
import { SeriesDetails } from '@/types/Types';
import { getSeriesByGenreId } from '@/services';

interface Props {
  genreId: number;
}

export const SeriesGenrePageContent = ({ genreId }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<SeriesDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSeries = async () => {
    const { results } = await getSeriesByGenreId(genreId);
    setData((prevData) => [...prevData, ...results]);
    setLoading(false);
  };

  useEffect(() => {
    fetchSeries();
  }, [page]);

  const handleScroll = () => {
    if (
      document.body.scrollHeight - 300 <
      window.scrollY + window.innerHeight
    ) {
      setLoading(true);
    }
  };

  window.addEventListener('scroll', handleScroll);

  useEffect(() => {
    if (loading == true) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  return (
    <section className="flex flex-wrap items-center justify-around gap-4 px-4">
      {data.map((series: SeriesDetails) => {
        return <VerticalMovieCard key={series.id} data={series} isSeries />;
      })}
    </section>
  );
};
