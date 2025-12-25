import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { ProfileClient } from '@/components';

async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const userData = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      _count: {
        select: {
          favorites: true,
          watchlist: true,
        },
      },
    },
  });

  if (!userData) redirect('/login');

  return (
    <section className="container mx-auto mt-20 px-4 py-8 md:mt-24">
      <ProfileClient user={userData} />
    </section>
  );
}

export default ProfilePage;
