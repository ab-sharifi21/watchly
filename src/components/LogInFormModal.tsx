'use client';
import { ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const LogInFormModal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-white/30">
            <div className="bg-primary-bg-color/70 flex flex-col rounded-md shadow-lg p-4 w-[90%] xl:w-[700px]">
                <button
                    className="text-secondary-color self-end hover:text-primary-color text-xl"
                    onClick={onClose}
                >
                    <IoMdClose className='h-7 w-7' />
                </button>
                {children}
            </div>
        </div>
    );
}
