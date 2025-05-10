export interface Article {
  id: string;
  title: string;
  snippet: string;
  description: string;
  content: string;
  image_url: string | null;
  url: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  dashboard_key: string;
  author: string | null;
  source: string | null;
  views: number;
  likes: number;
  tags: string[];
  summary?: string;
  category?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  keywords?: string[];
  reading_time?: number;
  comments?: number;
  shares?: number;
}

export interface Dashboard {
  id: string;
  key: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  article_ids: string[];
  is_public: boolean;
  user_id: string | null;
}

export interface Tag {
  id: string;
  name: string;
  created_at: string;
}

export interface UserSettings {
  id: string;
  user_id: string;
  dashboard_key: string;
  created_at: string;
  updated_at: string;
}

export interface UserFavorite {
  id: string;
  user_id: string;
  article_id: string;
  created_at: string;
} 