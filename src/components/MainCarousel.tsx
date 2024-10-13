'use client';

import React, { useState } from 'react';
import useDevice from '@/hooks/useDevice';
import { Genre, MovieDetails } from '@/types/Types';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { MovieInfo } from './MovieInfo';

interface Movies {
  movies: MovieDetails[];
  genres: Genre[];
}

const MainCarousel = ({ movies, genres }: Movies) => {
  const { isMobile } = useDevice();
  const [currentSlide, setCurrentSlide] = useState(0);
  const imageURL = isMobile
    ? process.env.NEXT_PUBLIC_IMAGE_BASE_URL_MOBILE
    : process.env.NEXT_PUBLIC_IMAGE_BASE_URL_DESKTOP;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % movies.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
  };

  return (
    <div
      className={`relative ${isMobile ? 'h-[60vh]' : 'h-screen'} w-full overflow-hidden`}
    >
      <div
        className="flex h-full w-full transition-transform duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative min-h-full w-full flex-shrink-0"
          >
            <img
              src={`${imageURL}${movie.backdrop_path}`}
              alt={movie.title}
              className="min-h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
            <MovieInfo movie={movie} genres={genres} />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform place-items-center gap-2 space-x-2">
        <button
          onClick={prevSlide}
          className="rounded-full bg-secondary-bg-color font-semibold text-primary-color md:p-1"
        >
          <GrFormPrevious className="h-10 w-10" />
        </button>
        {movies.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-primary-color'}`}
          ></div>
        ))}
        <button
          onClick={nextSlide}
          className="rounded-full bg-secondary-bg-color font-semibold text-primary-color md:p-1"
        >
          <GrFormNext className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
};

export default MainCarousel;
