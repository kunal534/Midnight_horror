// import type { Metadata } from 'next';
// import { ReactNode } from 'react';
// import { Nosifer, Cinzel, Lora } from 'next/font/google';
// import dynamic from 'next/dynamic';
// import BoneNavigation from '@/components/Navigation/BoneNavigation';
// import EnhancedMusicPlayer from '@/components/MusicPlayer/EnhancedMusicPlayer';
// import Footer from '@/components/Footer/Footer';
// import { Analytics } from '@vercel/analytics/next';
// import { SpeedInsights } from '@vercel/speed-insights/next';
// import './globals.scss';
// import { AgeProvider } from '@/components/AgeGate/AgeContext';
// import AgeGateOverlay from '@/components/AgeGate/AgeGateOverlay';
// import HorrorCursor from '@/components/HorrorCursor/HorrorCursor';

// // Dynamic import to prevent SSR issues
// const JumpScare = dynamic(
//   () => import('@/components/JumpScare/JumpScare'),
//   { ssr: false }
// );

// // Configure Google Fonts
// const nosifer = Nosifer({
//   weight: '400',
//   subsets: ['latin'],
//   variable: '--font-nosifer',
//   display: 'swap',
// });

// const cinzel = Cinzel({
//   subsets: ['latin'],
//   variable: '--font-cinzel',
//   display: 'swap',
// });

// const lora = Lora({
//   subsets: ['latin'],
//   variable: '--font-lora',
//   display: 'swap',
// });

// export const metadata: Metadata = {
//   title: 'Midnight Horror Tales',
//   description:
//     'Experience spine-chilling horror stories curated for the midnight hour.',
// };

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html 
//       lang="en" 
//       className={`${nosifer.variable} ${cinzel.variable} ${lora.variable}`}
//     >
//       <body>
//         <HorrorCursor>
//           <AgeProvider>
//             {/* Jump scare effect across all pages */}
//             <JumpScare />
            
//             {/* Popup shows only until user picks a mode */}
//             <AgeGateOverlay />

//             <BoneNavigation />
//             <main className="main-content">{children}</main>

//             {/* Always available, even for minors */}
//             <EnhancedMusicPlayer />
//             <Footer />
//           </AgeProvider>

//           <Analytics />
//           <SpeedInsights />
//         </HorrorCursor>
//       </body>
//     </html>
//   );
// }
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Nosifer, Cinzel, Lora } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.scss';
import ClientLayout from './ClientLayout';

const nosifer = Nosifer({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-nosifer',
  display: 'optional',
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
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
