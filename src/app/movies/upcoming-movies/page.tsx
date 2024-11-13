import { Footer, UpcomingMoviesContent } from '@/components';

export default async function UpcomingMoviesPage() {
  return (
    <>
      <main>
        <h1 className="mb-4 ml-4 mt-16 text-2xl font-bold text-primary-color">
          Exciting upcoming movies await!
        </h1>
        <UpcomingMoviesContent />
      </main>
      <Footer />
    </>
  );
}
