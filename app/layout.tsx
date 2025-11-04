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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Creepster&family=Nosifer&family=Butcherman&family=Felipa&family=Eater&family=Creepster&display=swap" rel="stylesheet" />
      </head>
      <body>
        <HorrorAnimation />
        <HorrorCursor />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
