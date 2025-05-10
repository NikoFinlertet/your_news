'use client';

import { useState } from 'react';
import { Article } from '../lib/types';
import Mosaic from '../components/Mosaic';
import { Header } from '../components/Header';
import '../styles/components/Main.css';
import '../styles/components/Mosaic.css';

interface HomeClientProps {
  articles: Article[];
}

export default function HomeClient({ articles }: HomeClientProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredArticles = selectedTags.length > 0
    ? articles.filter(article => 
        selectedTags.every(tag => article.tags.includes(tag))
      )
    : articles;

  if (!articles || articles.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Статьи не найдены</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <Header 
        articles={articles}
        selectedTags={selectedTags}
        onTagSelect={setSelectedTags}
      />
      <Mosaic articles={filteredArticles} />
    </main>
  );
} 