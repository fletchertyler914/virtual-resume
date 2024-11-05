import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
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
    <html lang='en'>
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}
