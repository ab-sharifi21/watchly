'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, Button, SearchBox, Logo } from './index';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { data: session } = useSession();

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
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gray-200 sm:inline">
              {session.user.name ?? session.user.email}
            </span>

            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="rounded bg-primary-color px-3 py-1 text-white"
            >
              Sign out
            </button>
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
