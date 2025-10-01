import { useCallback, useEffect, useState } from 'react';

export const useInfiniteScroll = <T>(
  fetchFunction: (page: number) => Promise<T[]>,
) => {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to fetch data
  const fetchData = useCallback(
    async (currentPage: number) => {
      setLoading(true);
      try {
        const results = await fetchFunction(currentPage);
        setData((prevData) => [...prevData, ...results]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    },
    [fetchFunction],
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

      if (scrollHeight - scrollTop - clientHeight < 300 && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // Reset function for new searches
  const resetData = useCallback(() => {
    setData([]);
    setPage(1);
    setLoading(false);
  }, []);

  return { data, loading, page, resetData };
};
