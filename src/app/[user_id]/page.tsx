import { getDigestData, getDigestNews, getNews } from '@/lib/dataProvider';
import Mosaic from '@/components/Mosaic';
import { Header } from '@/components/Header';
import Unauthorized from '@/components/Unauthorized';


interface PageProps {
  params: {
    user_id: string;
  };
}

export default async function DigestPage({ params }: PageProps) {
  console.log('Digest key from URL:', params.user_id);

  const digest = await getDigestData(params.user_id);
  if (!digest) return;

  const news_ids = await getDigestNews(digest.id);
  const news = await getNews(news_ids);

  
  return (
    <main className="min-h-screen bg-black">
      <Mosaic news_arr={news} />
    </main>
  );
} 