import { Metadata } from 'next';
import { MoviesContent } from '@/components';
import { paths } from '@/constants/constants';
import { titleFont } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Watcly - upcoming',
  description: 'Enjoy upcoming movies',
};

export default async function UpcomingMoviesPage() {
  return (
    <>
      <h1
        className={`${titleFont.className} mb-4 ml-4 mt-16 text-2xl font-bold text-primary-color`}
      >
        Exciting upcoming movies await!
      </h1>
      <MoviesContent path={paths.upcomingMovies} />
    </>
  );
}
