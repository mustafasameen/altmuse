import type {Metadata} from 'next';
import {DM_Mono, Inter} from 'next/font/google';

import './globals.css';

import {Toaster} from '@/components/ui/sonner';

const fontSans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const fontMono = DM_Mono({
  variable: '--font-mono',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MochaSimplifier',
  description:
    "Transform complex text into clear, accessible content. Upload any image or PDF and get simplified text that's easier to understand for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontMono.variable} antialiased font-sans`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
