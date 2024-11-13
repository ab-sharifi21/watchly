'use client';
import { getMovies } from '@/services';
import { VerticalMovieCard } from './VerticalMovieCard';
import { useEffect, useState } from 'react';
import { MovieDetails } from '@/types/Types';
import { Pagination } from './Pagination';

export const TopRatedMoviesContent = () => {
  const [data, setData] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const totalPages = 10;

  if (page > 10) {
    setPage(10);
  }
  if (page < 1) {
    setPage(1);
  }

  const fetchMovies = async () => {
    setLoading(true);
    const { results } = await getMovies({ path: 'movie/top_rated', page });
    setData(results);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const nextPage = () => {
    setPage((prevPage) => (prevPage += 1));
  };

  const previousPage = () => {
    setPage((prevPage) => (prevPage -= 1));
  };

  return (
    <>
      <section className="flex flex-wrap items-center justify-center gap-4 px-4">
        {!loading ? (
          data.map((movie) => <VerticalMovieCard key={movie.id} data={movie} />)
        ) : (
          <p>Loading...</p>
        )}
      </section>
      <Pagination
        page={page}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </>
  );
};
