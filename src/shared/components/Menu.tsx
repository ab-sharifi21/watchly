'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import useDevice from '@/shared/hooks/useDevice';
import { FaCaretDown } from 'react-icons/fa';
import { closeMenu, toggleMenu } from '@/lib/utils';

const baseLinks = [
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

const authLinks = [
  {
    id: 4,
    name: 'Watchlist',
    url: '/watchlist',
  },
  {
    id: 5,
    name: 'Favorites',
    url: '/favorites',
  },
];

export const Menu = ({ classes }: { classes?: string }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { isMobile } = useDevice();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Conditionally add authenticated links
  const links = useMemo(() => {
    return session ? [...baseLinks, ...authLinks] : baseLinks;
  }, [session]);

  return (
    <>
      {isMobile ? (
        <div className="group relative">
          <button
            onClick={() => toggleMenu(isMenuOpen, setIsMenuOpen)}
            className="flex place-items-center gap-1 outline-none"
          >
            Browse
            <FaCaretDown
              className={`${isMenuOpen && 'rotate-180deg'} duration-300`}
            />
          </button>
          {isMenuOpen && (
            <div
              className="absolute right-0 top-full z-10 mt-2 flex w-[7rem] flex-col items-start rounded-md bg-secondary-bg-color p-4 shadow-lg"
              onMouseLeave={() => closeMenu(setIsMenuOpen)}
            >
              <ul className="flex flex-col items-start gap-2">
                {links.map((link) => (
                  <li key={link.id}>
                    <Link
                      className={`text-sm hover:text-[#a0a0a0] ${
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
