'use client';

import { Article } from '@/lib/types';
import { TagsMenu } from './TagsMenu';
import '@/styles/components/Header.css';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  stats?: {
    articles: number;
    sources: number;
  };
  articles: Article[];
  onTagSelect: (tag: string) => void;
  selectedTags: string[];
}

export function DashboardHeader({
  title,
  subtitle,
  stats,
  articles,
  onTagSelect,
  selectedTags
}: DashboardHeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <h1 className="header-title">{title}</h1>
          {subtitle && <p className="header-subtitle">{subtitle}</p>}
          {stats && (
            <div className="header-stats">
              <span>{stats.articles} статей</span>
              <span>{stats.sources} источников</span>
            </div>
          )}
        </div>
        <div className="header-actions">
          <TagsMenu
            articles={articles}
            selectedTags={selectedTags}
            onTagSelect={(tags) => tags.forEach(tag => onTagSelect(tag))}
          />
        </div>
      </div>
    </header>
  );
} 