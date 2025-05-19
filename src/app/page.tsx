import { getDigestData, getDigestNews, getNews } from '@/lib/dataProvider';
import Mosaic from '@/components/Mosaic';
import { getCookie } from '@/lib/cookies';
import Unauthorized from '@/components/Unauthorized';


export default async function DigestPage() {
  const user_id = await getCookie();
  console.log('Digest key from URL:', user_id);

  if (!user_id) {
    return <Unauthorized/>;
  }

  const digest = await getDigestData(user_id);
  if (!digest) return;

  const news_ids = await getDigestNews(digest.id);
  const news = await getNews(news_ids);

  
  return (
    <main className="min-h-screen bg-black">
      <Mosaic news_arr={news} />
    </main>
  );
} 