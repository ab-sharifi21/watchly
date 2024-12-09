import type { Metadata } from 'next';
import './globals.css';
import { poppins } from '@/lib/fonts';
import { Footer, Header } from '@/components';

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
        className={`${poppins.className} flex min-h-screen flex-col bg-primary-bg-color text-white antialiased custom-scrollbar`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
