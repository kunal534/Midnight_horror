import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Nosifer, Cinzel, Lora } from 'next/font/google';
import BoneNavigation from '@/components/Navigation/BoneNavigation';
import EnhancedMusicPlayer from '@/components/MusicPlayer/EnhancedMusicPlayer';
import Footer from '@/components/Footer/Footer';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.scss';
import { AgeProvider } from '@/components/AgeGate/AgeContext';
import AgeGateOverlay from '@/components/AgeGate/AgeGateOverlay';

// Configure Google Fonts
const nosifer = Nosifer({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-nosifer',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Midnight Horror Tales',
  description:
    'Experience spine-chilling horror stories curated for the midnight hour.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html 
      lang="en" 
      className={`${nosifer.variable} ${cinzel.variable} ${lora.variable}`}
    >
      <body>
        <AgeProvider>
          {/* Popup shows only until user picks a mode */}
          <AgeGateOverlay />

          <BoneNavigation />
          <main className="main-content">{children}</main>

          {/* Always available, even for minors */}
          <EnhancedMusicPlayer />
          <Footer />
        </AgeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
