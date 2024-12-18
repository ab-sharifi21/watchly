'use client';
import React from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const LogInFormModal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-white/30">
          <div className="flex w-[90%] flex-col rounded-md bg-primary-bg-color/70 p-4 shadow-lg xl:w-[700px]">
            <button
              className="self-end text-xl text-secondary-color hover:text-primary-color"
              onClick={onClose}
            >
              <IoMdClose className="h-7 w-7" />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
