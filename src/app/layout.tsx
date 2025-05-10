import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Header } from '@/components/Header';
import { AuthProvider } from '../components/providers/AuthProvider';
import { DashboardProvider } from '../components/providers/DashboardProvider';
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
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

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