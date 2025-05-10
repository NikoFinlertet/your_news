import { Article } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import '@/styles/components/Mosaic.css';

interface MosaicProps {
  articles: Article[];
}

export default function Mosaic({ articles }: MosaicProps) {
  return (
    <div className="mosaic">
      {articles.map((article) => (
        <Link
          href={`/article/${article.id}`}
          key={article.id}
          className="mosaic-item"
        >
          <div className="article-card">
            {article.image_url && (
              <div className="article-image">
                <Image
                  src={article.image_url}
                  alt={article.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
            <div className="article-content">
              <h2 className="article-title">{article.title}</h2>
              <p className="article-description">{article.description}</p>
              <div className="article-meta">
                {article.author && (
                  <span className="article-author">{article.author}</span>
                )}
                <span className="article-date">
                  {new Date(article.published_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 