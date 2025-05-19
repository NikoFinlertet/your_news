'use client';

import { useState } from 'react';
import { News } from '@/lib/types';
import Link from 'next/link';
import { NewsModal } from './NewsModal';
import '@/styles/components/Mosaic.css';
import Unauthorized from './Unauthorized';
import { Header } from './Header';


interface MosaicProps {
  news_arr: News[];
}


export default function Mosaic({ news_arr }: MosaicProps) {
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleCardClick = (e: React.MouseEvent, news: News) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedNews(news);
  };

  const handleTagSelect = (tags: string[]) => {
    setSelectedTags(tags);
  };

  if (!news_arr || news_arr.length === 0) {
    return(<Unauthorized/>);
  }

  const filteredNews = selectedTags.length > 0 
    ? news_arr.filter(news => 
        selectedTags.every(tag => news.ai_tags?.includes(tag))
      )
    : news_arr;

  return (
    <>
      <Header 
        news={news_arr}
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
      />
      <div className="mosaic">
        {filteredNews.map((item) => (
          <Link
            href={`/news/${item.id}`}
            key={item.id}
            className="mosaic-item"
            onClick={(e) => handleCardClick(e, item)}
          >
            <div className="article-card" style={{borderRadius: '20px'}}>
              <div className="article-content">
                <h2 className="article-title">{item.ai_title}</h2>
                <p className="article-description">{item.summary}</p>
                <div className="article-meta">
                  <span className="article-date">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {selectedNews && (
        <NewsModal
          news={selectedNews}
          isOpen={true}
          onClose={() => setSelectedNews(null)}
        />
      )}
    </>
  );
} 