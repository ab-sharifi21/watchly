'use client';
import styles from '../styles/button.module.css';

interface ButtonProps {
  buttonText: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ buttonText, children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`border-3 flex cursor-pointer place-items-center gap-2 overflow-hidden rounded-md border-white/40 bg-primary-color px-4 py-1 text-[15px] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-white/60 md:px-5 md:py-2 ${styles.shine}`}
    >
      <span>{buttonText}</span>
      {children}
    </button>
  );
};

export default Button;
