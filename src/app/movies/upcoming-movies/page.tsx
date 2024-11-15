import { Footer, MoviesContent } from '@/components';
import { paths } from '@/constants/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watcly - upcoming',
  description: 'Enjoy upcoming movies',
};

export default async function UpcomingMoviesPage() {
  return (
    <>
      <main>
        <h1 className="mb-4 ml-4 mt-16 text-2xl font-bold text-primary-color">
          Exciting upcoming movies await!
        </h1>
        <MoviesContent path={paths.upcomingMovies} />
      </main>
      <Footer />
    </>
  );
}
