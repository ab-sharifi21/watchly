'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaCaretDown } from 'react-icons/fa';
import { toggleMenu } from '@/lib/utils';
import { genresRoutes } from '@/constants/constants';

interface Props {
  isSeries?: boolean;
}

export const GenresMenu = ({ isSeries }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="mt-8 px-3">
      <button
        onClick={() => toggleMenu(isMenuOpen, setIsMenuOpen)}
        className="flex place-items-center gap-1 text-secondary-color outline-none"
      >
        Explore all genres
        <FaCaretDown
          className={`${isMenuOpen && 'rotate-180deg'} duration-300`}
        />
      </button>

      <ul
        className={`${isMenuOpen ? 'flex' : 'hidden'} mt-4 flex-wrap items-center gap-2`}
      >
        {genresRoutes.map((genre) => (
          <li key={genre.id} className="my-1">
            <Link
              className={`rounded-full border border-primary-color px-2 py-1 hover:text-secondary-color`}
              href={`${isSeries ? '/series' : '/movies'} ${genre.href}`}
            >
              {genre.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
