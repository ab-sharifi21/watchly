import type { Metadata } from 'next';
import { poppins } from '@/lib/fonts';
import Providers from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Watchly',
  description: 'Movie App built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} custom-scrollbar flex min-h-screen flex-col bg-primary-bg-color text-white antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
