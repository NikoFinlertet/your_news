import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../components/providers/AuthProvider';
import { DashboardProvider } from '../components/providers/DashboardProvider';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const HeaderData: Metadata = {
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
        <AuthProvider>
          <DashboardProvider>
            <main>{children}</main>
          </DashboardProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 