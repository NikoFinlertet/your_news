/**
 * Модуль для работы с данными через Supabase
 * Предоставляет функции для получения данных дашборда и статей
 */
import { createClient } from '@supabase/supabase-js';
import { Digest, Digest_News, News } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// FIXME: export
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export const dynamic = "force-dynamic";


export async function getDigestData(user_id: string): Promise<Digest | null> {
  if (!supabase) {
    console.log('Supabase client is not initialized');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('digests')
      .select('*')
      .eq('user_id', user_id as unknown as string)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if(!data || data.length === 0) {
      return null;
    }

    return data[0] as Digest;
  } catch (error) {
    console.error('Error fetching digests:', error);
    return null;
  }
}

export async function getDigestNews(digest_id: string): Promise<string[]> {
  if (!supabase) return [];

  try{
    const { data, error } = await supabase
      .from('digest_news')
      .select('news_id')
      .eq('digest_id', digest_id);

    if (error) throw error;
    return data.map(item => item.news_id);
  } catch (error) {
    console.error('Error fetching digest news:', error);
    return [];
  }
} 

export async function getNews(news_ids: string[]): Promise<News[]> {
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('personal_news')
      .select('*')
      .in('id', news_ids);

    if (error) throw error;

    return data as News[];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
} 

export async function getSources(): Promise<string[]> {
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('sources')
      .select('title')
      .eq('indexer_type', 'telegram');

    console.log("Fetched sources: ", data);
    
    if (error) throw error;

    return data.map(item => item.title as string);
  } catch (error) {
    console.error('Error fetching sources:', error);
    return [];
  }
}
