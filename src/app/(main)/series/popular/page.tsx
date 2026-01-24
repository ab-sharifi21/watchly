import { Metadata } from 'next';
import { MediaContent } from '@/shared/components';
import { paths } from '@/constants/constants';
import { titleFont } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Watchly - popular',
  description: 'Check out popular series that everyone is talking about',
};

export default function TopRatedSeriesPage() {
  return (
    <>
      <h1
        className={`${titleFont.className} mb-4 ml-4 mt-16 text-2xl font-bold text-primary-color`}
      >
        Check out popular series that everyone is talking about
      </h1>
      <MediaContent path={paths.popularSeries} isSeries />
    </>
  );
}
