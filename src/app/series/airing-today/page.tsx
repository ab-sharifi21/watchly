import { MoviesContent } from '@/components';
import { paths } from '@/constants/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watchly - airing today',
  description: 'Check out the series airing today',
};

export default function TopRatedSeriesPage() {
  return (
    <>
      <h1 className="mb-4 ml-4 mt-16 text-2xl font-bold text-primary-color">
        Check out the series airing today
      </h1>
      <MoviesContent path={paths.airingTodaySeries} isSeries />
    </>
  );
}
