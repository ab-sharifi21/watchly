import { fetcher } from './fetcher';

export const getMovieWatchProviders = (movieId: string | number) => {
    const path = `movie/${movieId}/watch/providers`
    return fetcher({ path });
};