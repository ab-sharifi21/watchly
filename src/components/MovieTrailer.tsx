'use client';
import { useEffect, useState } from 'react';
import { FaCirclePlay } from 'react-icons/fa6';
import { Modal } from './Modal';
import Button from './Button';
import { getOneMovieTrailer } from '@/services/getMovieTrailer';
import { MovieTrailer } from '@/types/Types';

export const Trailer = ({ id }: { id: number | string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [trailer, setTrailer] = useState('');

  useEffect(() => {
    const fetchTrailerData = async () => {
      try {
        const { results } = await getOneMovieTrailer(id);
        if (results && results.length > 0) {
          const trailer = results.find(
            (video: MovieTrailer) => video.type === 'Trailer',
          );
          if (trailer) {
            setTrailer(trailer.key);
          } else {
            setTrailer(results[0].key);
          }
        } else {
          return 'No trailers found.';
        }
      } catch (error) {
        console.error('Error fetching trailer data:', error);
      }
    };

    fetchTrailerData();
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button onClick={openModal} buttonText="Trailer">
        <FaCirclePlay />
      </Button>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          trailer={trailer}
        />
      )}
    </>
  );
};
