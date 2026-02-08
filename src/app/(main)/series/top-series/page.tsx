import { Metadata } from 'next';
import { MediaContent } from '@/shared/components';
import { tmdbApiEndpoints } from '@/shared/constants/constants';
import { titleFont } from '@/lib/fonts';

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
      <MediaContent path={tmdbApiEndpoints.topRatedSeries} isSeries />
    </>
  );
}
