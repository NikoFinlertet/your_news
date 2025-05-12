'use client';

import { useState } from 'react';
import { Article } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { ArticleModal } from './ArticleModal';
import '@/styles/components/Mosaic.css';

interface MosaicProps {
  articles: Article[];
}

export default function Mosaic({ articles }: MosaicProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleCardClick = (e: React.MouseEvent, article: Article) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedArticle(article);
  };

  return (
    <>
      <div className="mosaic">
        {articles.map((article) => (
          <Link
            href={`/article/${article.id}`}
            key={article.id}
            className="mosaic-item"
            onClick={(e) => handleCardClick(e, article)}
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
                <p className="article-description">{article.snippet}</p>
                <div className="article-meta">
                  <span className="article-date">
                    {new Date(article.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          isOpen={true}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </>
  );
} 