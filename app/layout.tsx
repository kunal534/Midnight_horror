import type { Metadata } from 'next';
import Navigation from '@/components/Navigation/Navigation';
import HorrorCursor from '@/components/HorrorCursor/HorrorCursor';
import HorrorAnimation from '@/components/HorrorAnimation/HorrorAnimation';
import './globals.css';

export const metadata: Metadata = {
  title: 'Midnight Horror Tales',
  description: 'Lost in the woods. Haunted by memories. Craving love. Becoming legend.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HorrorAnimation />
        <HorrorCursor />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
