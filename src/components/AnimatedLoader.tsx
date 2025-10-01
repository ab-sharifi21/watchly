interface AnimatedLoaderProps {
  containerClassName?: string;
  spinnerClassName?: string;
}

export const AnimatedLoader = ({ containerClassName, spinnerClassName }: AnimatedLoaderProps) => (
  <div className={`flex items-center justify-center ${containerClassName}`}>
    <div className={`h-12 w-12 animate-spin rounded-full border-4 border-primary-color border-t-transparent ${spinnerClassName}`}></div>
  </div>
);
