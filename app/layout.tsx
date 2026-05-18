import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wankinproperties.com'),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'plots for sale Kenya',
    'land for sale Juja',
    'plots Malindi',
    'Makuyu land',
    'Ruai plots',
    'title deed Kenya',
    'Wankin Properties',
    'buy land Kenya',
  ],
  authors: [{ name: 'Wankin Properties Limited' }],
  creator: 'Wankin Properties Limited',
  publisher: 'Wankin Properties Limited',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://wankinproperties.com',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/images/brand/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Wankin Properties Limited',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/images/brand/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? '',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
