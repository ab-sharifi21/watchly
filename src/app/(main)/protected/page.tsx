import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions as any);
  if (!session) redirect('/login');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Protected Content</h1>
      <p className="mt-4">Welcome, {(session as any).user?.email}</p>
    </div>
  );
}
