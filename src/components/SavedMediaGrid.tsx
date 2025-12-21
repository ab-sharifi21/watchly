'use client';

import { useState } from 'react';
import { SavedMediaCard } from './SavedMediaCard';
import { FaHeart, FaBookmark } from 'react-icons/fa';

interface MediaItem {
  id: string;
  userId: string;
  mediaId: number;
  mediaType: string;
  title: string;
  posterPath: string | null;
  createdAt: string;
}

interface SavedMediaGridProps {
  items: MediaItem[];
  type: 'favorites' | 'watchlist';
}

export const SavedMediaGrid = ({
  items: initialItems,
  type,
}: SavedMediaGridProps) => {
  const [items, setItems] = useState(initialItems);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  const handleRemove = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    setRemovingIds((prev) => new Set(prev).add(id));

    // Optimistic update
    setItems((prev) => prev.filter((i) => i.id !== id));

    try {
      const endpoint =
        type === 'favorites' ? '/api/favorites' : '/api/watchlist';
      const res = await fetch(endpoint, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mediaId: item.mediaId,
          mediaType: item.mediaType,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to remove');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      // Revert optimistic update
      setItems((prev) =>
        [...prev, item].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
    } finally {
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[390px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-700 bg-slate-800/30 px-12 py-0 text-center">
        {type === 'favorites' ? (
          <>
            <FaHeart className="mb-4 h-14 w-14 text-slate-600" />
            <h3 className="mb-2 text-lg font-semibold text-slate-300">
              No Favorites Yet
            </h3>
            <p className="text-slate-400">
              Start adding movies and TV shows to your favorites!
            </p>
          </>
        ) : (
          <>
            <FaBookmark className="mb-4 h-14 w-14 text-slate-600" />
            <h3 className="mb-2 text-lg font-semibold text-slate-300">
              No Items in Watchlist
            </h3>
            <p className="text-slate-400">
              Add movies and TV shows you want to watch later!
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {items.map((item) => (
        <SavedMediaCard
          key={item.id}
          id={item.id}
          mediaId={item.mediaId}
          mediaType={item.mediaType}
          title={item.title}
          posterPath={item.posterPath}
          onRemove={handleRemove}
          type={type}
        />
      ))}
    </div>
  );
};
