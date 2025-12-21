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
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [series, setSeries] = useState<SeriesDetails[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  // Create fetch function that switches based on showMovies
  const fetchData = useCallback(
    async (page: number): Promise<(MovieDetails | SeriesDetails)[]> => {
      if (!query) return [];
      try {
        if (showMovies) {
          const { results } = await getMovieByName({
            path: 'search/movie',
            query: `${encodeURIComponent(query)}`,
            page,
          });
          return results;
        } else {
          const { results } = await getSeriesByName({
            path: 'search/tv',
            query: `${encodeURIComponent(query)}`,
            page,
          });
          return results;
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        return [];
      }
    },
    [query, showMovies],
  );

  // Use infinite scroll hook
  const { data, loading, resetData } = useInfiniteScroll<
    MovieDetails | SeriesDetails
  >(fetchData);

  // Update movies or series when data changes
  useEffect(() => {
    if (showMovies) {
      setMovies(data as MovieDetails[]);
    } else {
      setSeries(data as SeriesDetails[]);
    }
  }, [data, showMovies]);

  // Reset data when switching between movies and series
  useEffect(() => {
    resetData();
  }, [showMovies, resetData]);

  // Get initial totals and handle query changes
  useEffect(() => {
    if (query) {
      const fetchInitialData = async () => {
        setInitialLoading(true);
        setError(null);

        try {
          // Reset infinite scroll data and local state
          resetData();
          setMovies([]);
          setSeries([]);

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
  }, [query, resetData]);

  if (initialLoading) {
    return <AnimatedLoader containerClassName="mt-[7rem]" />;
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
      <div className="m-4 mt-16 flex items-center gap-4">
        <p className={`${titleFont.className} text-slate-400`}>
          Results found for {query}{' '}
          <span className="text-primary-color">&lt;</span>
          {totalMovies + totalSeries}
          <span className="text-primary-color">&gt;</span>
        </p>
        <span
          className={`cursor-pointer text-sm text-slate-300 transition-all duration-200 hover:scale-110 hover:text-slate-400 hover:underline ${showMovies && 'text-slate-400 underline'}`}
          onClick={() => setShowMovies(true)}
        >
          {totalMovies} movies
        </span>
        <span
          className={`cursor-pointer text-sm text-slate-300 transition-all duration-200 hover:scale-110 hover:text-slate-400 hover:underline ${!showMovies && 'text-slate-400 underline'}`}
          onClick={() => setShowMovies(false)}
        >
          {totalSeries} series
        </span>
      </div>
      {showMovies ? (
        <>
          <div className="flex flex-wrap items-center justify-center gap-4 px-4">
            {movies.map((movie: MovieDetails) => {
              return (
                <VerticalMovieCard key={movie.backdrop_path} data={movie} />
              );
            })}
          </div>
          {loading && <AnimatedLoader containerClassName="mt-4" />}
        </>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-center gap-4 px-4">
            {series.map((series: SeriesDetails) => {
              return (
                <VerticalMovieCard key={series.id} data={series} isSeries />
              );
            })}
          </div>
          {loading && (
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
