'use client';

import { useCallback, useEffect, useState } from 'react';
import { getMovies } from '@/services';
import { MovieDetails } from '@/types/Types';
import { VerticalMediaCard, Pagination } from '@/shared/components';

interface Props {
  path: string;
  isSeries?: boolean;
}

export const MoviesContent = ({ path, isSeries }: Props) => {
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

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    const { results } = await getMovies({ path, page });
    setData(results);
    setLoading(false);
  }, [path, page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

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
          data.map((movie) => (
            <VerticalMediaCard
              key={movie.id}
              isSeries={isSeries}
              data={movie}
            />
          ))
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
