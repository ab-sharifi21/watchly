'use client';
import { useEffect } from 'react';

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  trailer: string;
}

export const Modal = ({ isModalOpen, setIsModalOpen, trailer }: ModalProps) => {
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
  className={`absolute z-50 flex ${!isModalOpen ? 'hidden' : ''} h-[55vh] bottom-0 left-1/2 transform  flex-col items-center rounded-xl w-[50vw]`}
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
