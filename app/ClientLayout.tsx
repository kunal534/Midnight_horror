'use client';

import { ReactNode } from 'react';
import BoneNavigation from '@/components/Navigation/BoneNavigation';
import EnhancedMusicPlayer from '@/components/MusicPlayer/EnhancedMusicPlayer';
import Footer from '@/components/Footer/Footer';
import { AgeProvider } from '@/components/AgeGate/AgeContext';
import AgeGateOverlay from '@/components/AgeGate/AgeGateOverlay';
import dynamic from 'next/dynamic';

const HorrorCursor = dynamic(
  () => import('@/components/HorrorCursor/HorrorCursor'),
  { ssr: false }
);

const JumpScare = dynamic(
  () => import('@/components/JumpScare/JumpScare'),
  { ssr: false }
);

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <HorrorCursor>
      <AgeProvider>
        {/* Skip JumpScare on initial Android debugging if needed */}
        <JumpScare />
        <AgeGateOverlay />
        <BoneNavigation />
        <main className="main-content">{children}</main>
        <EnhancedMusicPlayer />
        <Footer />
      </AgeProvider>
    </HorrorCursor>
  );
}
