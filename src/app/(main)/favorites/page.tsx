import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { FaHeart } from 'react-icons/fa';
import { SavedMediaGrid } from '@/components';
import { titleFont } from '@/lib/fonts';

export const metadata = {
  title: 'Watchly - My Favorites',
  description: 'Your favorite movies and TV shows',
};

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const favoritesRaw = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  const favorites = favoritesRaw.map((fav) => ({
    ...fav,
    createdAt: fav.createdAt.toISOString(),
  }));

  return (
    <div className="container mx-auto mt-16 px-4">
      <div className="mb-8">
        <h1
          className={`${titleFont.className} flex items-center gap-2 font-bold text-white`}
        >
          <FaHeart />
          My Favorites
        </h1>
        <p className="mt-2 text-slate-400">
          {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <SavedMediaGrid items={favorites} type="favorites" />
    </div>
  );
}
