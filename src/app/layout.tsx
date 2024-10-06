import type { Metadata } from 'next';
import './globals.css';
import { poppins } from '@/lib/fonts';
import { Header } from '@/components';

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
        className={`${poppins.className} min-h-screen bg-bg-primary-color text-white antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
