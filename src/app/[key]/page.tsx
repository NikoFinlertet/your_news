import { getDashboardData, getArticles } from '@/lib/dataProvider';
import Mosaic from '@/components/Mosaic';
import { Header } from '@/components/Header';

interface PageProps {
  params: {
    key: string;
  };
}

export default async function DashboardPage({ params }: PageProps) {
  console.log('Dashboard key from URL:', params.key);
  
  const dashboard = await getDashboardData(params.key);
  console.log('Dashboard data:', dashboard);
  
  if (!dashboard) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Дашборд не найден</p>
      </div>
    );
  }

  const articles = await getArticles(dashboard);
  console.log('Articles:', articles);

  return (
    <main className="min-h-screen bg-black">
      <Header articles={articles} />
      <Mosaic articles={articles} />
    </main>
  );
} 