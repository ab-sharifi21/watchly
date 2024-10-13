export const handleClickOutside = (
  event: MouseEvent,
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
) => {
  if (ref.current && !ref.current.contains(event.target as Node)) {
    callback();
  }
};

export const toggleMenu = (
  isMenuOpen: boolean,
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsMenuOpen(!isMenuOpen);
};

export const closeMenu = (
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsMenuOpen(false);
};

export const formatDate = (dateString: string): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [year, month, day] = dateString.split('-');
  const monthName = months[parseInt(month, 10) - 1];

  return `${monthName}-${day}-${year}`;
};
