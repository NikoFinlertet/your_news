'use client';

import { useState, useRef, useEffect } from 'react';
import '../styles/components/TagsMenu.css';

interface TagsMenuProps {
  onTagSelect?: (tags: string[]) => void;
  selectedTags?: string[];
  articles?: any[];
}

export function TagsMenu({ onTagSelect, selectedTags = [], articles = [] }: TagsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const allTags = Array.from(
    new Set(
      articles.flatMap((article) => article.tags || [])
    )
  ).sort();

  const handleTagClick = (tag: string) => {
    if (!onTagSelect) return;

    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    onTagSelect(newTags);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="tags-menu" ref={menuRef}>
      <button
        className="tags-menu-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Меню тегов"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
        Теги
        {selectedTags.length > 0 && (
          <span className="selected-count">{selectedTags.length}</span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="tags-menu-overlay" onClick={handleOverlayClick} />
          <div className="tags-menu-dropdown">
            <h3 className="text-lg font-medium text-white mb-4">Выберите теги</h3>
            {allTags.length > 0 ? (
              <div className="tags-grid">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    className={`tag-item ${
                      selectedTags.includes(tag) ? 'selected' : ''
                    }`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            ) : (
              <div className="no-tags">Нет доступных тегов</div>
            )}
          </div>
        </>
      )}
    </div>
  );
} 