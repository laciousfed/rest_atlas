import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://restatlas.com'),
  title: {
    default: 'Rest Atlas — Global Hotel Sleep, Comfort & Relaxation Guide',
    template: '%s | Rest Atlas',
  },
  description:
    'Discover world-class hotels engineered for restorative sleep, acoustic quietness, high-grade bedding, blackout darkness, and nervous system recovery.',
  keywords: [
    'hotel sleep quality',
    'quiet hotels',
    'soundproof hotel rooms',
    'best hotel beds',
    'wellness retreats',
    'Hästens hotel beds',
    'sleep tourism',
    'restful stays',
  ],
  authors: [{ name: 'Rest Atlas Editorial Team' }],
  openGraph: {
    title: 'Rest Atlas — Find a stay that helps you truly rest',
    description:
      'The independent global hotel directory evaluating properties by sleep quality, quietness, bedding, and bedroom design.',
    url: 'https://restatlas.com',
    siteName: 'Rest Atlas',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rest Atlas — Global Hotel Sleep, Comfort & Relaxation Guide',
    description:
      'Discover world-class hotels engineered for restorative sleep, acoustic quietness, and nervous system recovery.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-sand-50 text-charcoal-900 antialiased selection:bg-forest-100 selection:text-forest-900">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
