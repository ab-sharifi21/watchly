'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaBookmark, FaHeart } from 'react-icons/fa';
import { IoPlayCircleOutline } from 'react-icons/io5';
import { useState } from 'react';

interface SavedMediaCardProps {
  id: string;
  mediaId: number;
  mediaType: string;
  title: string;
  posterPath: string | null;
  onRemove: (id: string) => Promise<void>;
  type: 'favorites' | 'watchlist';
}

export const SavedMediaCard = ({
  id,
  mediaId,
  mediaType,
  title,
  posterPath,
  onRemove,
  type,
}: SavedMediaCardProps) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const href =
    mediaType === 'movie' ? `/movies/${mediaId}` : `/series/${mediaId}`;

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isRemoving) return;

    setIsRemoving(true);
    try {
      await onRemove(id);
    } catch (error) {
      console.error('Failed to remove:', error);
      setIsRemoving(false);
    }
  };

  return (
    <article className="group relative h-[230px] w-full flex-none rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.4)]">
      <Link href={href} className="block h-full w-full cursor-pointer">
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          className="absolute left-2 top-2 z-20 text-primary-color backdrop-blur-sm transition-all duration-300 hover:scale-125"
          aria-label="Remove from list"
          title={
            type === 'favorites'
              ? 'Remove from favorites'
              : 'Remove from watchlist'
          }
        >
          {type === 'favorites' ? (
            <FaHeart className="h-4 w-4" />
          ) : (
            <FaBookmark className="h-4 w-4" />
          )}
        </button>

        <div className="relative h-full w-full overflow-hidden rounded-xl">
          {posterPath ? (
            <Image
              width={160}
              height={230}
              src={`https://image.tmdb.org/t/p/original${posterPath}`}
              alt={`${title}'s poster`}
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-700">
              <span className="text-slate-400">No Image</span>
            </div>
          )}

          {/* Shine effect on hover */}
          <div className="absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100"></div>
        </div>

        {/* Bottom gradient - always visible */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 rounded-b-xl bg-gradient-to-t from-black via-black/80 to-transparent"></div>

        {/* Top gradient - appears on hover */}
        <div className="absolute inset-x-0 top-0 h-1/3 rounded-t-xl bg-gradient-to-b from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        <div className="absolute bottom-0 left-0 right-0 p-3 transition-all duration-300">
          <p className="line-clamp-2 text-sm font-bold text-white drop-shadow-lg">
            {title}
          </p>
          <p className="mt-1 text-xs font-medium capitalize text-slate-300">
            {mediaType === 'tv' ? 'TV Series' : 'Movie'}
          </p>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-color/90 shadow-2xl backdrop-blur-sm">
            <IoPlayCircleOutline className="h-10 w-10 text-white" />
          </div>
        </div>
      </Link>
    </article>
  );
};
