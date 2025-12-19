import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const items = await prisma.watchlist.findMany({
    where: { userId: (session.user as any).id },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { mediaId, mediaType, title, posterPath } = body ?? {};

  if (typeof mediaId !== 'number' || typeof mediaType !== 'string') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  try {
    const created = await prisma.watchlist.create({
      data: {
        userId: (session.user as any).id,
        mediaId,
        mediaType,
        title: title ?? '',
        posterPath: posterPath ?? null,
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? 'Could not create' },
      { status: 409 },
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { mediaId, mediaType } = body ?? {};

  if (typeof mediaId !== 'number' || typeof mediaType !== 'string') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const deleted = await prisma.watchlist.deleteMany({
    where: { userId: (session.user as any).id, mediaId, mediaType },
  });

  return NextResponse.json({ deletedCount: deleted.count });
}
