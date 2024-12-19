'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getMovieByName, getSeriesByName } from '@/services';
import { MovieDetails, SeriesDetails } from '@/types/Types';
import { VerticalMovieCard } from '@/components';
import { titleFont } from '@/lib/fonts';

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        setLoading(true);
        const { results: movies } = await getMovieByName({
          path: 'search/movie',
          query: `${encodeURIComponent(query)}`,
        });
        const { results: series } = await getSeriesByName({
          path: 'search/tv',
          query: `${encodeURIComponent(query)}`,
        });
        setMovies(movies);
        setSeries(series);
      };

      fetchMovies();
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return (
      <p className="mb-4 ml-4 mt-16 text-xl font-bold text-primary-color">
        Loading...
      </p>
    );
  }

  if (!movies.length && !series.length) {
    return (
      <p className={`${titleFont.className} mb-4 ml-4 mt-16 text-2xl font-bold text-primary-color`}>
        No results found for{' '}
        <span className="italic text-secondary-color">{query}</span>.
      </p>
    );
  }

  return (
    <section className="">
      <h1 className={`${titleFont.className} mb-4 ml-4 mt-16 text-2xl font-bold text-primary-color`}>
        Search Results for {query}
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-4 px-4">
        {movies.map((movie: MovieDetails) => {
          return <VerticalMovieCard key={movie.id} data={movie} />;
        })}
        {series.map((series: SeriesDetails) => {
          return <VerticalMovieCard key={series.id} data={series} isSeries />;
        })}
      </div>
    </section>
  );
};

// Wrap SearchPage in Suspense
const SuspenseSearchPage = () => (
  <Suspense fallback={<div>Loading search...</div>}>
    <SearchPage />
  </Suspense>
);

export default SuspenseSearchPage;
