import { Metadata } from 'next';
import { MoviesContent } from '@/components';
import { paths } from '@/constants/constants';

export const metadata: Metadata = {
  title: 'Watchly - trending',
  description: 'Catch best trending movies!',
};

export default async function TrendingMoviesPage() {
  return (
    <>
      <h1 className="mb-4 ml-4 mt-16 text-2xl font-bold text-primary-color">
        Catch best trending movies!
      </h1>
      <MoviesContent path={paths.trendingMovies} />
    </>
  );
}
