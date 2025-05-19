'use client';

import { useEffect, useMemo, memo } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { News } from '@/lib/types';
import '@/styles/components/NewsModal.css';

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

  // Разбиваем текст на параграфы по двойному переносу строки
  const paragraphs = news.text.split('\n\n').filter(p => p.trim());

  return (
    <>
      <div className="modal-header">
        <span className="modal-date">{formattedDate}</span>
        <h2 className="modal-title">{news.ai_title}</h2>
      </div>

      <div className="modal-body">
        <div className="modal-content-wrapper">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="modal-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </>
  );
});

ModalContent.displayName = 'ModalContent';

export function NewsModal({ news, isOpen, onClose }: NewsModalProps) {
  const flag_popup = true;
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.ai_title,
          text: news.text,
        });
      } catch (error) {
        console.error('Ошибка при попытке поделиться:', error);
      }
    } else {
      //Triger tuta
      const newsToCopy = news.ai_title + news.text;
      if (newsToCopy) {
        navigator.clipboard.writeText(newsToCopy);
        toast.success('Скопировано в буфер обмена');
      }
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
      <Toaster toastOptions={{style: {
      color: '#ffffff',
      backgroundColor: '#222222',
    },}}/>
    </div>
  );
} 