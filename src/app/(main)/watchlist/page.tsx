import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { FaBookmark } from 'react-icons/fa';
import { SavedMediaGrid } from '@/shared/components';
import { titleFont } from '@/lib/fonts';

export const metadata = {
  title: 'Watchly - My Watchlist',
  description: 'Movies and TV shows you want to watch',
};

export default async function WatchlistPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const watchlistRaw = await prisma.watchlist.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  const watchlist = watchlistRaw.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));

  return (
    <section className="container mx-auto mt-16 px-4">
      <div className="mb-8">
        <h1
          className={`${titleFont.className} flex items-center gap-2 font-bold text-white`}
        >
          <FaBookmark />
          My Watchlist
        </h1>
        <p className="mt-2 text-slate-400">
          {watchlist.length} {watchlist.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <SavedMediaGrid items={watchlist} type="watchlist" />
    </section>
  );
}
