import { useCallback, useEffect, useState } from 'react';

export const useInfiniteScroll = <T>(
  fetchFunction: (page: number) => Promise<T[]>,
) => {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Function to fetch data
  const fetchData = useCallback(
    async (currentPage: number) => {
      if (!hasMore) return; // Don't fetch if no more data

      setLoading(true);
      try {
        const results = await fetchFunction(currentPage);

        // If results are empty or less than expected, we've reached the end
        if (results.length === 0) {
          setHasMore(false);
        } else {
          setData((prevData) => [...prevData, ...results]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    },
    [fetchFunction, hasMore],
  );

  // Fetch data when page changes
  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (
        scrollHeight - scrollTop - clientHeight < 300 &&
        !loading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  // Reset function for new searches
  const resetData = useCallback(() => {
    setData([]);
    setPage(1);
    setLoading(false);
    setHasMore(true);
  }, []);

  return { data, loading, page, resetData, hasMore };
};
