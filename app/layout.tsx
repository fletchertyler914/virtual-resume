import type { Metadata } from 'next';
import { Montserrat, Space_Grotesk } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  variable: '--font-display',
});

import './globals.css';

export const metadata: Metadata = {
  title: 'Tyler Fletcher',
  description: 'Tyler Fletcher Virtual Resume',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${montserrat.variable} ${spaceGrotesk.variable}`}
    >
      <body
        className={`antialiased bg-background text-foreground bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(99,102,241,0.18),transparent),radial-gradient(800px_400px_at_100%_10%,rgba(56,189,248,0.12),transparent),radial-gradient(600px_300px_at_0%_60%,rgba(168,85,247,0.12),transparent)] min-h-screen relative`}
      >
        {/* decorative blurred blobs */}
        <div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
          <div className='absolute top-[-120px] left-[-120px] h-[360px] w-[360px] rounded-full bg-primary/30 blur-3xl'></div>
          <div className='absolute top-[20%] right-[-120px] h-[420px] w-[420px] rounded-full bg-secondary/25 blur-3xl'></div>
          <div className='absolute bottom-[-140px] left-[10%] h-[300px] w-[300px] rounded-full bg-accent/25 blur-3xl'></div>
        </div>
        {children}
      </body>
    </html>
  );
}
