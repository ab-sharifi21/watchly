'use client';
import useDevice from '@/hooks/useDevice';
import { useEffect } from 'react';

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  trailer: string;
}

export const Modal = ({ isModalOpen, setIsModalOpen, trailer }: ModalProps) => {
  const { isMobile } = useDevice();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modalBox = document.getElementById('modal-box');
      if (modalBox && !modalBox.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <>
      <div
        id="modal-box"
        className={`absolute flex ${!isModalOpen ? 'hidden' : ''} h-[55vh] flex-col items-center rounded-xl ${isMobile ? '-top-1/2 w-[100vw]' : 'bottom-0 w-[50vw] translate-x-1/2 transform'} `}
      >
        <iframe
          className="absolute inset-0 h-full w-full rounded-xl"
          src={`https://www.youtube.com/embed/${trailer}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};
