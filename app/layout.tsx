import type { Metadata } from 'next';
import { ReactNode } from 'react';
import BoneNavigation from '@/components/Navigation/BoneNavigation';
import EnhancedMusicPlayer from '@/components/MusicPlayer/EnhancedMusicPlayer';
import Footer from '@/components/Footer/Footer';
import { Analytics } from "@vercel/analytics/next"
import './globals.scss';

export const metadata: Metadata = {
  title: 'Midnight Horror Tales',
  description: 'Experience spine-chilling horror stories curated for the midnight hour.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0a0000" />
      </head>
      <body>
        <BoneNavigation />
        <main className="main-content">{children}</main>
        <EnhancedMusicPlayer />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
