'use client';
import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  trailer: string;
}

export const Modal = ({ isModalOpen, setIsModalOpen, trailer }: ModalProps) => {
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

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
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null;

  return createPortal(
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
            className="absolute -right-4 -top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 text-white transition-all hover:scale-110 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-white"
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
    </>,
    document.body,
  );
};
