'use client';

import { useEffect, useMemo, memo } from 'react';
import { News } from '@/lib/types';
import '@/styles/components/ArticleModal.css';

interface NewsModalProps {
  news: News;
  isOpen: boolean;
  onClose: () => void;
}

// Мемоизированный компонент для содержимого модального окна
const ModalContent = memo(({ news }: { news: News }) => {
  const formattedDate = useMemo(() => 
    new Date(news.created_at).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }), 
    [news.created_at]
  );

  return (
    <>
      <div className="modal-header">
        <h2 className="modal-title">{news.title}</h2>
        <span className="modal-date">{formattedDate}</span>
      </div>

      <div className="modal-body">
        <div className="modal-content-wrapper">
          <p className="modal-description">{news.text}</p>
        </div>
      </div>
    </>
  );
});

ModalContent.displayName = 'ModalContent';

export function NewsModal({ news, isOpen, onClose }: NewsModalProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.text,
          //url: article.source_url,
        });
      } catch (error) {
        console.error('Ошибка при попытке поделиться:', error);
      }
    } else {
      /*
      // Fallback для браузеров без поддержки Web Share API
      const urlToCopy = article.source_url || article.url;
      if (urlToCopy) {
        navigator.clipboard.writeText(urlToCopy);
        alert('Ссылка скопирована в буфер обмена');
      } else {
        alert('Ссылка недоступна');
      }
      */
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className={`modal-overlay ${isOpen ? 'modal-overlay-visible' : ''}`}
      onClick={onClose}
    >
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-controls">
          <button 
            className="modal-share-button"
            onClick={handleShare}
            aria-label="Поделиться"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>
          <button 
            className="modal-close" 
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>
        
        <ModalContent news={news} />
      </div>
    </div>
  );
} 