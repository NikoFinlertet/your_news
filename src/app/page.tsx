import { mockArticles } from '../lib/mockData';
import { Article } from '../lib/types';
import HomeClient from './HomeClient';

async function getArticles() {
  return mockArticles;
}

export default async function Home() {
  const allArticles = await getArticles();
  return <HomeClient articles={allArticles} />;
} 