'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

interface MediaItem {
  id: string;
  userId: string;
  mediaId: number;
  mediaType: string;
  title: string;
  posterPath: string | null;
  createdAt: string;
}

export function useFavorites() {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = useCallback(async () => {
    if (status !== 'authenticated') return;

    try {
      const res = await fetch('/api/favorites');
      if (res.ok) {
        const data = await res.json();
        setFavorites(data);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  }, [status]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const isFavorite = useCallback(
    (mediaId: number, mediaType: string) => {
      return favorites.some(
        (fav) => fav.mediaId === mediaId && fav.mediaType === mediaType,
      );
    },
    [favorites],
  );

  const toggleFavorite = useCallback(
    async (
      mediaId: number,
      mediaType: string,
      title: string,
      posterPath?: string,
    ) => {
      if (status !== 'authenticated') {
        window.location.href = '/login';
        return;
      }

      setLoading(true);
      const isCurrentlyFavorite = isFavorite(mediaId, mediaType);

      // Optimistic update
      if (isCurrentlyFavorite) {
        setFavorites((prev) =>
          prev.filter(
            (fav) => !(fav.mediaId === mediaId && fav.mediaType === mediaType),
          ),
        );
      } else {
        const newItem: MediaItem = {
          id: `temp-${Date.now()}`,
          userId: session?.user?.id || '',
          mediaId,
          mediaType,
          title,
          posterPath: posterPath || null,
          createdAt: new Date().toISOString(),
        };
        setFavorites((prev) => [newItem, ...prev]);
      }

      try {
        const method = isCurrentlyFavorite ? 'DELETE' : 'POST';
        const res = await fetch('/api/favorites', {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mediaId, mediaType, title, posterPath }),
        });

        if (!res.ok) {
          // Revert optimistic update
          if (isCurrentlyFavorite) {
            await fetchFavorites();
          } else {
            setFavorites((prev) =>
              prev.filter(
                (fav) =>
                  !(fav.mediaId === mediaId && fav.mediaType === mediaType),
              ),
            );
          }
          toast.error('Something went wrong. Please try again.', {
            position: 'bottom-right',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
          throw new Error('Failed to toggle favorite');
        }

        // Refresh to get the real server data
        await fetchFavorites();
        toast.success(
          isCurrentlyFavorite ? 'Removed from favorites' : 'Added to favorites',
          {
            position: 'bottom-right',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          },
        );
      } catch (error) {
        console.error('Error toggling favorite:', error);
        toast.error('Something went wrong. Please try again.', {
          position: 'bottom-right',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      } finally {
        setLoading(false);
      }
    },
    [status, isFavorite, fetchFavorites, session],
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    loading,
    isAuthenticated: status === 'authenticated',
  };
}

export function useWatchlist() {
  const { data: session, status } = useSession();
  const [watchlist, setWatchlist] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWatchlist = useCallback(async () => {
    if (status !== 'authenticated') return;

    try {
      const res = await fetch('/api/watchlist');
      if (res.ok) {
        const data = await res.json();
        setWatchlist(data);
      }
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  }, [status]);

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  const isInWatchlist = useCallback(
    (mediaId: number, mediaType: string) => {
      return watchlist.some(
        (item) => item.mediaId === mediaId && item.mediaType === mediaType,
      );
    },
    [watchlist],
  );

  const toggleWatchlist = useCallback(
    async (
      mediaId: number,
      mediaType: string,
      title: string,
      posterPath?: string,
    ) => {
      if (status !== 'authenticated') {
        window.location.href = '/login';
        return;
      }

      setLoading(true);
      const isCurrentlyInWatchlist = isInWatchlist(mediaId, mediaType);

      // Optimistic update
      if (isCurrentlyInWatchlist) {
        setWatchlist((prev) =>
          prev.filter(
            (item) =>
              !(item.mediaId === mediaId && item.mediaType === mediaType),
          ),
        );
      } else {
        const newItem: MediaItem = {
          id: `temp-${Date.now()}`,
          userId: session?.user?.id || '',
          mediaId,
          mediaType,
          title,
          posterPath: posterPath || null,
          createdAt: new Date().toISOString(),
        };
        setWatchlist((prev) => [newItem, ...prev]);
      }

      try {
        const method = isCurrentlyInWatchlist ? 'DELETE' : 'POST';
        const res = await fetch('/api/watchlist', {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mediaId, mediaType, title, posterPath }),
        });

        if (!res.ok) {
          // Revert optimistic update
          if (isCurrentlyInWatchlist) {
            await fetchWatchlist();
          } else {
            setWatchlist((prev) =>
              prev.filter(
                (item) =>
                  !(item.mediaId === mediaId && item.mediaType === mediaType),
              ),
            );
          }
          toast.error('Something went wrong. Please try again.', {
            position: 'bottom-right',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
          throw new Error('Failed to toggle watchlist');
        }

        // Refresh to get the real server data
        await fetchWatchlist();
        toast.success(
          isCurrentlyInWatchlist
            ? 'Removed from watchlist'
            : 'Added to watchlist',
          {
            position: 'bottom-right',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          },
        );
      } catch (error) {
        console.error('Error toggling watchlist:', error);
        toast.error('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [status, isInWatchlist, fetchWatchlist, session],
  );

  return {
    watchlist,
    isInWatchlist,
    toggleWatchlist,
    loading,
    isAuthenticated: status === 'authenticated',
  };
}
