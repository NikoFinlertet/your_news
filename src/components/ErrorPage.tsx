'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import '../styles/components/ErrorPage.css';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Ошибка:', error);
  }, [error]);

  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-title">Упс! Что-то пошло не так</h1>
        <p className="error-message">{error.message || 'Произошла непредвиденная ошибка'}</p>
        <div className="error-actions">
          <button className="error-button retry" onClick={reset}>
            Попробовать снова
          </button>
          <Link href="/" className="error-button home">
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
} 