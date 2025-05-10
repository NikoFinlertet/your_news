'use client';

import { useState, useEffect } from 'react';
import { ArticleCard } from '@/components/ArticleCard';
import { Footer } from '@/components/Footer';
import { getDashboardData } from '@/lib/dataProvider';
import { getArticlesByDashboard } from '@/lib/mockData';
import { Article } from '@/lib/types';
import '@/styles/components/Main.css';

interface PageProps {
  params: {
    key: string;
  };
}

export default function DashboardPage({ params }: PageProps) {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      const dashboardData = await getDashboardData(params.key);
      if (dashboardData) {
        setDashboard(dashboardData);
        const articles = getArticlesByDashboard(dashboardData);
        setAllArticles(articles);
        setFilteredArticles(articles);
      }
      setIsLoading(false);
    };
    loadData();
  }, [params.key]);

  if (isLoading) {
    return (
      <div className="main">
        <div className="main-container">
          <h1>Загрузка...</h1>
        </div>
      </div>
    );
  }

  if (!dashboard || allArticles.length === 0) {
    return (
      <div className="main">
        <div className="main-container">
          <h1>Дашборд не найден</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="main">
        <div className="main-container">
          <div className="articles-grid">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 