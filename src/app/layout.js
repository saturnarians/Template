

import { Inter } from 'next/font/google';
import './globals.css';
import RootLayoutWrapper from '@/client/components/layout/RootLayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Church Website',
  description: 'A modern church website built with Next.js',
  icons: {
    icon: [
      { url: '/favicon.ico' }, // Points to app/favicon.ico or public/favicon.ico
      { url: '/icon.png', type: 'image/png' },
      { url: '/Logo.svg', type: 'image/svg+xml' },
      { url: '/icon_light.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon_dark.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png', // Points to app/apple-icon.png or public/apple-icon.png
  },
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
