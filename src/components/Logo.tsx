import Image from 'next/image';
import Link from 'next/link';
import { caveat } from '@/lib/fonts';

interface LogoProps {
  height: number;
  width: number;
  classes?: string;
}

export const Logo = ({ width, height, classes }: LogoProps) => {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Image src="/images/logo.png" width={width} height={height} alt="logo" />
      <h1 className={`${caveat.className} text-2xl ${classes}`}>Watchly</h1>
    </Link>
  );
};
