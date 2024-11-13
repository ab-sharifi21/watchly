import { Footer, TopRatedMoviesContent } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watchly - top rated',
  description: 'Top rated movies of all time',
};

export default async function TopRatedMoviesPage() {
  return (
    <>
      <main>
        <h1 className="mb-4 ml-4 mt-16 text-2xl font-bold text-primary-color">
          Uncover the best-rated movies!
        </h1>
        <TopRatedMoviesContent />
      </main>
      <Footer />
    </>
  );
}
