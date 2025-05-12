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

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
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
            e.preventDefault();
            handleCardClick(e as unknown as React.MouseEvent);
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
          <p className="article-description">{article.snippet}</p>
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