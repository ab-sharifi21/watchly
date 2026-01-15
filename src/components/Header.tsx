'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FaRegUser } from 'react-icons/fa';
import { Menu, SearchBox, Logo } from './index';
import { Button } from '@/shared/components';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsProfileMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-20 flex justify-between px-2 py-2 md:px-6 ${isScrolled && 'bg-black/70'} md:py-4`}
    >
      <div className={`md:gap:12 lg:gap-18 flex place-items-center gap-6`}>
        <Logo height={27} width={27} />
        <Menu />
      </div>
      <div className="flex place-items-center gap-2">
        <SearchBox />

        {session?.user ? (
          <div
            className="relative flex items-center gap-3"
            ref={profileMenuRef}
          >
            <button
              className="flex items-center justify-center rounded-full bg-slate-600 p-2 transition-all duration-200 hover:scale-110 hover:bg-slate-500"
              onClick={toggleMenu}
            >
              <FaRegUser />
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 min-w-[180px] overflow-hidden rounded-md bg-secondary-bg-color shadow-xl backdrop-blur-sm">
                <div className="border-b border-slate-600 px-4 py-3">
                  <span className="block truncate text-sm font-medium text-white">
                    {session.user.name}
                  </span>
                </div>
                <Link
                  href="/profile"
                  className="block w-full px-4 py-2.5 text-left text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                >
                  Profile
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full px-4 py-2.5 text-left text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <Button buttonText="Log in" />
          </Link>
        )}
      </div>
    </header>
  );
};
