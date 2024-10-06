'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import useDevice from '@/hooks/useDevice';
import { FaCaretDown } from 'react-icons/fa';
import { closeMenu, toggleMenu } from '@/lib/utils';

const links = [
  {
    id: 1,
    name: 'Home',
    url: '/',
  },
  {
    id: 2,
    name: 'Movies',
    url: '/movies',
  },
  {
    id: 3,
    name: 'TV Shows',
    url: '/series',
  },
];

export const Menu = ({ classes }: { classes?: string }) => {
  const pathname = usePathname();
  const { isMobile } = useDevice();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      {isMobile ? (
        <div className="relative group">
          <button
            onClick={() => toggleMenu(isMenuOpen, setIsMenuOpen)}
            className="outline-none flex gap-1 place-items-center"
          >
            Browse
            <FaCaretDown className={`${isMenuOpen && 'rotate-180deg'} duration-300`} />
          </button>
          {isMenuOpen && (
            <div
              className="absolute top-full w-[7rem] mt-2 right-0 z-10 flex flex-col items-start bg-bg-secondary-color p-4 rounded-md shadow-lg"
              onMouseLeave={() => closeMenu(setIsMenuOpen)}
            >
              <ul className="flex flex-col items-start gap-2">
                {links.map((link) => (
                  <li key={link.id}>
                    <Link
                      className={`hover:text-[#a0a0a0] text-sm ${
                        link.url === pathname && 'text-[#a0a0a0]'
                      }`}
                      href={link.url}
                      onClick={() => closeMenu(setIsMenuOpen)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <ul className={`${classes} flex items-center gap-4`}>
          {links.map((link) => (
            <li key={link.id}>
              <Link
                className={`hover:text-[#a0a0a0] ${
                  link.url === pathname && 'text-[#a0a0a0]'
                }`}
                href={link.url}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};