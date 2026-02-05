'use client';

import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useFavorites, useWatchlist } from '@/shared/hooks/useMediaActions';

interface MediaActionButtonsProps {
  mediaId: number;
  mediaType: 'movie' | 'tv';
  title: string;
  posterPath?: string;
}

export const MediaActionButtons = ({
  mediaId,
  mediaType,
  title,
  posterPath,
}: MediaActionButtonsProps) => {
  const { isFavorite, toggleFavorite, loading: favLoading } = useFavorites();

  const {
    isInWatchlist,
    toggleWatchlist,
    loading: watchLoading,
  } = useWatchlist();

  const isFav = isFavorite(mediaId, mediaType);
  const isWatch = isInWatchlist(mediaId, mediaType);

  return (
    <div className="flex gap-3">
      <button
        onClick={() => toggleFavorite(mediaId, mediaType, title, posterPath)}
        disabled={favLoading}
        className="group flex items-center gap-2 rounded-lg bg-slate-800/80 px-4 py-2 backdrop-blur-sm transition-all hover:bg-slate-700/80 disabled:opacity-50"
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFav ? (
          <FaHeart className="h-5 w-5 text-red-500 transition-transform group-hover:scale-110" />
        ) : (
          <FaRegHeart className="h-5 w-5 text-slate-300 transition-transform group-hover:scale-110" />
        )}
        <span className="text-sm font-medium text-slate-200">
          {isFav ? 'Favorited' : 'Favorite'}
        </span>
      </button>

      <button
        onClick={() => toggleWatchlist(mediaId, mediaType, title, posterPath)}
        disabled={watchLoading}
        className="group flex items-center gap-2 rounded-lg bg-slate-800/80 px-4 py-2 backdrop-blur-sm transition-all hover:bg-slate-700/80 disabled:opacity-50"
        aria-label={isWatch ? 'Remove from watchlist' : 'Add to watchlist'}
      >
        {isWatch ? (
          <FaBookmark className="h-5 w-5 text-blue-500 transition-transform group-hover:scale-110" />
        ) : (
          <FaRegBookmark className="h-5 w-5 text-slate-300 transition-transform group-hover:scale-110" />
        )}
        <span className="text-sm font-medium text-slate-200">
          {isWatch ? 'In Watchlist' : 'Watchlist'}
        </span>
      </button>
    </div>
  );
};
