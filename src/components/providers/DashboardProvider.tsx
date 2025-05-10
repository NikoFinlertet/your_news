'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Article } from '@/lib/types';

interface DashboardContextType {
  title: string;
  subtitle: string;
  articles: Article[];
  filteredArticles: Article[];
  setFilteredArticles: (articles: Article[]) => void;
  setDashboardData: (data: { title: string; subtitle?: string; articles: Article[] }) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState('YourNews');
  const [subtitle, setSubtitle] = useState('Агрегатор новостей и аналитики');
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  const setDashboardData = (data: { title: string; subtitle?: string; articles: Article[] }) => {
    setTitle(data.title);
    setSubtitle(data.subtitle || 'Агрегатор новостей и аналитики');
    setArticles(data.articles);
    setFilteredArticles(data.articles);
  };

  return (
    <DashboardContext.Provider
      value={{
        title,
        subtitle,
        articles,
        filteredArticles,
        setFilteredArticles,
        setDashboardData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
} 