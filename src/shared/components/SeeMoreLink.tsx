'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

interface SeeMoreLinkProps {
  id: number;
  isSeries?: boolean;
}

export function SeeMoreLink({ id, isSeries }: SeeMoreLinkProps) {
  const pathname = usePathname();

  // Define the expected detail path
  const detailPath = `/${isSeries ? 'series' : 'movies'}/${id}`;

  // Hide link if already on that page
  if (pathname === detailPath) return null;

  return (
    <Link
      href={detailPath}
      className="group flex items-center text-sm text-slate-400 hover:text-primary-color"
    >
      See more{' '}
      <MdOutlineKeyboardDoubleArrowRight className="hidden duration-300 group-hover:inline-block group-hover:animate-slideIn" />
    </Link>
  );
}
