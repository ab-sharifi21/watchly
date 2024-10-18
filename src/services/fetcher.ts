'use server';

interface FetcherProps {
  path: string;
  query?: string;
  page?: number;
}

export const fetcher = async ({ path, query, page = 1 }: FetcherProps) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${path}?api_key=${process.env.API_KEY}&query=${query}&language=en-US&page=${page}`,
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch data. Status: ' + response.status);
  }

  return data;
};
