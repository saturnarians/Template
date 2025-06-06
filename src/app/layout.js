

import { Inter } from 'next/font/google';
import './globals.css';
import RootLayoutWrapper from '@/client/components/layout/RootLayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Church Website',
  description: 'A modern church website built with Next.js',
};

export default function RootLayout({ children }) {
  
  if (typeof children  === 'undefined') {
    return null; // loader can be added here
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <RootLayoutWrapper>
          {children}
        </RootLayoutWrapper>
      </body>
    </html>
  );
}
