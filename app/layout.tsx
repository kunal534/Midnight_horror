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
  verification: {
    google: `7twLU_UC3ppJCSbOdFXPfPtbd7YT9LYJ5Fe01JdGD2Q`,
  },
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
