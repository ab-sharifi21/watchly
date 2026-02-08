import { Genre } from '@/shared/types/common.types';

export const getOneMovieGenres = (genreIds: number[], genres: Genre[]) => {
  const movieGenres: Genre[] = [];

  if (Array.isArray(genreIds) && genreIds.length > 0) {
    const genreMap = new Map(genres.map((genre) => [genre.id, genre]));

    genreIds.forEach((genreId: number) => {
      const genre = genreMap.get(genreId);
      if (genre) {
        movieGenres.push(genre);
      }
    });
  }

  return movieGenres.slice(0, 2);
};
