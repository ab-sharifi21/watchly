import { MoviesContent } from '@/components';
import { paths } from '@/constants/constants';
import { titleFont } from '@/lib/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watchly - top series',
  description: 'Dive into the top-rated shows',
};

export default function TopRatedSeriesPage() {
  return (
    <>
      <h1
        className={`${titleFont.className} mb-4 ml-4 mt-16 text-2xl font-bold text-primary-color`}
      >
        Dive into the top-rated shows
      </h1>
      <MoviesContent path={paths.topRatedSeries} isSeries />
    </>
  );
}
