
export const handleClickOutside = (
    event: MouseEvent,
    ref: React.RefObject<HTMLElement>,
    callback: () => void
  ) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };
  
  export const toggleMenu = (
    isMenuOpen: boolean,
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  export const closeMenu = (
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsMenuOpen(false);
  };