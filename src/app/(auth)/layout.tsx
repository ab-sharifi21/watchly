import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Watchly - Authentication',
  description: 'Sign in or create your Watchly account',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
