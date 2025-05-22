import type { Metadata } from 'next';
import { CookiesProvider } from 'next-client-cookies/server';
import YandexMetrika from '@/components/YandexMetrica';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'YourNews - Новости и аналитика',
  description: 'Агрегатор новостей и аналитики',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className={`${inter.className} antialiased`}>
        <CookiesProvider>{children}</CookiesProvider>
        <YandexMetrika/>
      </body>
    </html>
  );
} 