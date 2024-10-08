import { fetcher } from "./fetcher";

export const getTopRatedMovies = async (page?: number) => { 
    const path = 'movie/top_rated';
    return fetcher({ path, page });
}