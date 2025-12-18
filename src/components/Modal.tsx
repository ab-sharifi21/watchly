'use client';
import { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import useDevice from '@/hooks/useDevice';

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
      const modalContent = document.getElementById('modal-content');
      if (modalContent && !modalContent.contains(event.target as Node)) {
        closeModal();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="animate-in fade-in fixed inset-0 z-50 bg-black/80 backdrop-blur-sm duration-200"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div
          id="modal-content"
          className="animate-in zoom-in-95 fade-in relative w-full max-w-5xl duration-200"
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute -right-10 -top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800/90 text-white transition-all hover:scale-110 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-white sm:-right-12"
            aria-label="Close modal"
          >
            <IoMdClose />
          </button>

          {/* Video Container */}
          <div className="relative w-full overflow-hidden rounded-lg bg-black shadow-2xl">
            {/* 16:9 Aspect Ratio Container */}
            <div className="relative w-full pt-[56.25%]">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${trailer}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Trailer"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
