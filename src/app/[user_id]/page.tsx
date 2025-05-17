import { getDigestData, getDigestNews, getNews } from '@/lib/dataProvider';
import Mosaic from '@/components/Mosaic';
import { Header } from '@/components/Header';

interface PageProps {
  params: {
    user_id: string;
  };
}

export default async function DigestPage({ params }: PageProps) {
  console.log('Digest key from URL:', params.user_id);
  const digest = await getDigestData(params.user_id);
  
  if (!digest) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Дайджест не найден</p>
      </div>
    );
  }

  const news_ids = await getDigestNews(digest.id);
  const news = await getNews(news_ids);

  return (
    <main className="min-h-screen bg-black">
      <Header articles={news} />
      <Mosaic articles={news} />
    </main>
  );
} 