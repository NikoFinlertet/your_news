'use client';

import { useState, useCallback } from 'react';
import { Article } from '@/lib/types';

interface HeaderWrapperProps {
  title: string;
  subtitle?: string;
  stats?: {
    articles: number;
    sources: number;
  };
  articles: Article[];
  onFilterChange: (filteredArticles: Article[]) => void;
}


/*
export function HeaderWrapper({ 
  title, 
  subtitle, 
  stats,
  articles,
  onFilterChange 
}: HeaderWrapperProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagSelect = useCallback((tag: string) => {
    setSelectedTags(prevTags => {
      const newSelectedTags = prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag];
      
      // Фильтруем статьи, которые содержат ВСЕ выбранные теги
      const filteredArticles = newSelectedTags.length > 0
        ? articles.filter(article => 
            newSelectedTags.every(selectedTag => 
              article.tags.includes(selectedTag)
            )
          )
        : articles;
      
      onFilterChange(filteredArticles);
      return newSelectedTags;
    });
  }, [articles, onFilterChange]);

  return (
    <DashboardHeader
      title={title}
      subtitle={subtitle}
      stats={stats}
      onTagSelect={handleTagSelect}
      selectedTags={selectedTags}
      articles={articles}
    />
  );
} 
  */