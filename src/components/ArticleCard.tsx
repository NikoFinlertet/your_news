'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { ArticleModal } from './ArticleModal';
import '@/styles/components/ArticleCard.css';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        className={`article-card ${!article.image_url || imageError ? 'text-only' : ''}`}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleCardClick();
          }
        }}
      >
        {article.image_url && !imageError && (
          <div className="article-image">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              sizes="(max-width: 150px) 50vw, (max-width: 200px) 50vw, 33vw"
              className="article-image"
              priority={false}
              quality={75}
              onError={() => setImageError(true)}
            />
          </div>
        )}
        <div className="article-content">
          <h2 className="article-title">{article.title}</h2>
          <p className="article-description">{article.description}</p>
          <div className="article-footer">
            <span className="article-date">
              {new Date(article.published_at).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="article-link">
              Подробнее
            </span>
          </div>
        </div>
      </div>

      <ArticleModal
        article={article}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
} 