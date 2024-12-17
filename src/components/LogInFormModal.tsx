'use client';
import { IoMdClose } from 'react-icons/io';
import Button from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LogInFormModal = ({ isOpen, onClose }: ModalProps) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-white/30">
            <div className="flex w-[90%] flex-col rounded-md bg-primary-bg-color/70 p-4 shadow-lg xl:w-[700px]">
                <button
                    className="self-end text-xl text-secondary-color hover:text-primary-color"
                    onClick={onClose}
                >
                    <IoMdClose className="h-7 w-7" />
                </button>
                <h2 className="mb-4 text-xl font-semibold">Welcome to Watchly</h2>
                <form className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-md border bg-black/60 px-3 py-2 outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-md border bg-black/60 px-3 py-2 outline-none"
                    />
                    <div className="flex w-full justify-end gap-4">
                        <Button buttonText="Log In" />
                        <Button buttonText="Sign Up" />
                    </div>
                </form>
            </div>
        </div>
    );
};
