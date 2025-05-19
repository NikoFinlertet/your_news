'use client';

import { TagsMenu } from './TagsMenu';
import '../styles/components/Header.css';

interface HeaderProps {
  news?: any[];
  onTagSelect?: (tags: string[]) => void;
  selectedTags?: string[];
}

export function Header({ news = [], onTagSelect, selectedTags = [] }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <h1 className="header-title">YourNews</h1>
          <p className="header-subtitle">
            Агрегатор новостей и аналитики
          </p>
        </div>
        <div className="header-actions">
          {news.length > 0 && (
            <TagsMenu
              news_arr={news}
              selectedTags={selectedTags}
              onTagSelect={onTagSelect}
            />
          )}
        </div>
      </div>
    </header>
  );
} 

/*

*/