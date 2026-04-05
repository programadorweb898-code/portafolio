import type { Metadata } from 'next';
import { PT_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { AIChat } from '@/components/ai/AIChat';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'LuisDev Portafolio',
  description:
    'Portafolio profesional de Luis Alberto Gómez, desarrollador de software.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn('dark', ptSans.variable, playfairDisplay.variable)}
    >
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        {children}
        <AIChat />
        <Toaster />
      </body>
    </html>
  );
}
