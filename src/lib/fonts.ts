import { Poppins, Caveat, Montserrat_Alternates } from 'next/font/google';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const caveat = Caveat({
  subsets: ['latin'],
  weight: '700',
});

export const titleFont = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['700', '500', '600'],
});
