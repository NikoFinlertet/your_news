import type { Metadata } from 'next';
import { CookiesProvider } from 'next-client-cookies/server';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'YourNews - Новости и аналитика',
  description: 'Агрегатор новостей и аналитики',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="ru">
      <body className={inter.className}>
            <CookiesProvider>{children}</CookiesProvider>
      </body>
    </html>
  );
} 