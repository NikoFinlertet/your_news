import Link from 'next/link';
import '../styles/components/ErrorPage.css';

export default function NotFound() {
  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-title">404 - Страница не найдена</h1>
        <p className="error-message">
          Извините, но страница, которую вы ищете, не существует или была перемещена.
        </p>
        <div className="error-actions">
          <Link href="/" className="error-button home">
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
} 