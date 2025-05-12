import { createClient } from '@supabase/supabase-js';
import { Article, Dashboard } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseKey);

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export const dynamic = "force-dynamic";

export async function getDashboardData(key: string): Promise<Dashboard | null> {
  
  if (!supabase) {
    console.log('Supabase client is not initialized');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('demo_dashboards_')
      .select('*')
      .eq('key', key)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return data as Dashboard;
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return null;
  }
}

export async function getArticles(dashboard: Dashboard): Promise<Article[]> {
  if (!supabase) return [];

  try {
    if (!dashboard.articles || dashboard.articles.length === 0) return [];

    const { data, error } = await supabase
      .from('demo_articles_')
      .select('*');
    if (error) throw error;

    // Фильтруем только нужные id
    return (data as Article[]).filter(article =>
      dashboard.articles.includes(article.id)
    );
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
} 