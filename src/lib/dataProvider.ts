import { createClient } from '@supabase/supabase-js';
import { mockDashboard, Article, Dashboard } from './mockData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Инициализируем Supabase клиент только если есть необходимые переменные окружения
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

let useMockData = !supabase; // Используем моковые данные, если нет Supabase клиента

export function toggleDataMode() {
  if (!supabase) {
    console.warn('Supabase не настроен. Используются только моковые данные.');
    return true;
  }
  useMockData = !useMockData;
  return useMockData;
}

export async function getDashboardData(key: string): Promise<Dashboard | null> {
  if (useMockData || !supabase) {
    return mockDashboard;
  }

  try {
    const { data: dashboard, error } = await supabase
      .from('dashboards')
      .select('*')
      .eq('key', key)
      .single();

    if (error) throw error;
    return dashboard;
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return null;
  }
}

export async function getArticles(dashboardKey: string): Promise<Article[]> {
  if (useMockData || !supabase) {
    return mockDashboard.articles;
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('dashboard_key', dashboardKey);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// Функция для получения текущего режима данных
export function getCurrentDataMode(): boolean {
  return useMockData;
} 