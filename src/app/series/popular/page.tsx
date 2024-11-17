import { MoviesContent } from '@/components';
import { paths } from '@/constants/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watchly - popular',
  description: 'Check out popular series that everyone is talking about',
};

export default function TopRatedSeriesPage() {
  return (
    <>
      <h1 className="mb-4 ml-4 mt-16 text-2xl font-bold text-primary-color">
        Check out popular series that everyone is talking about
      </h1>
      <MoviesContent path={paths.popularSeries} isSeries />
    </>
  );
}
