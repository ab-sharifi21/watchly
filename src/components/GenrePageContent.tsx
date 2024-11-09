'use client';

import { getMoviesByGenreId } from '@/services';
import { MovieDetails } from '@/types/Types';
import { useEffect, useState } from 'react';
import { VerticalMovieCard } from './VerticalMovieCard';

interface Props {
  genreId: number;
}

export const GenrePageContent = ({ genreId }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMovies = async () => {
    const { results } = await getMoviesByGenreId(genreId, page);
    setData((prevData) => [...prevData, ...results]);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
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
      {data.map((movie: MovieDetails) => {
        return <VerticalMovieCard key={movie.id} data={movie} />;
      })}
    </section>
  );
};
