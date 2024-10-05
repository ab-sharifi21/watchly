'use client';
import styles from '../styles/button.module.css';

export const Button = ({
  buttonText,
  children,
}: {
  buttonText: string;
  children?: React.ReactNode;
}) => {
  return (
    <button
      className={`border-3 relative flex cursor-pointer place-items-center gap-2 overflow-hidden rounded-md border-white/40 bg-primary px-4 py-1 text-[15px] font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-white/60 md:px-5 md:py-2 ${styles.shine}`}
    >
      <span>{buttonText}</span>
      {children}
    </button>
  );
};

export default Button;
