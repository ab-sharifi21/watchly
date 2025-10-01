'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getMovieByName, getSeriesByName } from '@/services';
import { MovieDetails, SeriesDetails } from '@/types/Types';
import { VerticalMovieCard, AnimatedLoader } from '@/components';
import { titleFont } from '@/lib/fonts';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

const SearchPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalSeries, setTotalSeries] = useState(0);
  const [showMovies, setShowMovies] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  // Create fetch functions for movies and series
  const fetchMovies = useCallback(async (page: number): Promise<MovieDetails[]> => {
    if (!query) return [];
    try {
      const { results } = await getMovieByName({
        path: 'search/movie',
        query: `${encodeURIComponent(query)}`,
        page,
      });
      return results;
    } catch (err) {
      console.error('Error fetching movies:', err);
      return [];
    }
  }, [query]);

  const fetchSeries = useCallback(async (page: number): Promise<SeriesDetails[]> => {
    if (!query) return [];
    try {
      const { results } = await getSeriesByName({
        path: 'search/tv',
        query: `${encodeURIComponent(query)}`,
        page,
      });
      return results;
    } catch (err) {
      console.error('Error fetching series:', err);
      return [];
    }
  }, [query]);

  // Use infinite scroll hook
  const {
    data: movies,
    loading: moviesLoading,
    resetData: resetMovies
  } = useInfiniteScroll<MovieDetails>(fetchMovies);

  const {
    data: series,
    loading: seriesLoading,
    resetData: resetSeries
  } = useInfiniteScroll<SeriesDetails>(fetchSeries);

  // Get initial totals and handle query changes
  useEffect(() => {
    if (query) {
      const fetchInitialData = async () => {
        setInitialLoading(true);
        setError(null);

        try {
          // Reset infinite scroll data
          resetMovies();
          resetSeries();

          // Get first page to get total counts
          const [moviesResponse, seriesResponse] = await Promise.all([
            getMovieByName({
              path: 'search/movie',
              query: `${encodeURIComponent(query)}`,
              page: 1,
            }),
            getSeriesByName({
              path: 'search/tv',
              query: `${encodeURIComponent(query)}`,
              page: 1,
            }),
          ]);

          setTotalMovies(moviesResponse.total_results);
          setTotalSeries(seriesResponse.total_results);
        } catch (err) {
          setError('Something went wrong while searching. Please try again.');
          console.error('Search error:', err);
        } finally {
          setInitialLoading(false);
        }
      };

      fetchInitialData();
    }
  }, [query, resetMovies, resetSeries]);

  if (initialLoading) {
    return <AnimatedLoader containerClassName='mt-[7rem]' />;
  }

  if (error) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h2
            className={`${titleFont.className} mb-4 text-2xl font-bold text-red-500`}
          >
            Oops! Something went wrong
          </h2>
          <p className="mb-6 text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-secondary-color px-6 py-2 text-white transition-all hover:bg-opacity-80"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!movies.length && !series.length) {
    return (
      <p className={`${titleFont.className} m-4 mt-16 text-2xl`}>
        Oops! No matches found for{' '}
        <span className="text-primary-color">&lt;</span>
        {query}
        <span className="text-primary-color">&gt;</span>
      </p>
    );
  }

  return (
    <section>
      <div className="m-4 mt-16 flex items-center justify-between gap-4">
        <h1 className={`${titleFont.className} text-2xl`}>
          Results found for {query}{' '}
          <span className="text-primary-color">&lt;</span>
          {totalMovies + totalSeries}
          <span className="text-primary-color">&gt;</span>
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowMovies(true)}
            className={`rounded border p-1 pl-2 pr-2 duration-200 hover:border-primary-color hover:bg-primary-color ${showMovies ? 'border-red-500 bg-primary-color' : 'border-white'}`}
          >
            {totalMovies} movies found
          </button>
          <button
            onClick={() => setShowMovies(false)}
            className={`rounded border p-1 pl-2 pr-2 duration-200 hover:border-primary-color hover:bg-primary-color ${!showMovies ? 'border-primary-color bg-primary-color' : 'border-white'}`}
          >
            {totalSeries} series found
          </button>
        </div>
      </div>
      {showMovies ? (
        <>
          <div className="flex flex-wrap items-center justify-center gap-4 px-4">
            {movies.map((movie: MovieDetails) => {
              return <VerticalMovieCard key={movie.id} data={movie} />;
            })}
          </div>
          {moviesLoading && (
            <AnimatedLoader containerClassName="mt-4" />
          )}
        </>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-center gap-4 px-4">
            {series.map((series: SeriesDetails) => {
              return <VerticalMovieCard key={series.id} data={series} isSeries />;
            })}
          </div>
          {seriesLoading && (
            <div className="flex justify-center py-4">
              <AnimatedLoader containerClassName="mt-4" />
            </div>
          )}
        </>
      )}
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
