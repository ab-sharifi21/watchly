'use client';
import styles from '../styles/button.module.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  buttonText: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({
  buttonText,
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`border-3 ${buttonText ? 'flex cursor-pointer place-items-center gap-2' : ''} overflow-hidden rounded-md border-white/40 px-4 py-1 text-[15px] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:border-white/60 md:px-5 md:py-2 ${styles.shine} ${className.includes('bg-') ? '' : 'bg-primary-color'} ${className}`}
    >
      {buttonText && <span>{buttonText}</span>}
      {children}
    </button>
  );
};

export default Button;
