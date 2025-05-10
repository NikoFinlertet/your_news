export interface Article {
  id: string;
  title: string;
  snippet: string;
  description: string;
  content: string;
  image_url?: string;
  url: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  dashboard_key: string;
  category?: string;
  sentiment?: string;
  summary?: string;
  keywords?: string[];
  source: string;
  author: string;
  reading_time?: number;
  views: number;
  likes: number;
  comments?: number;
  shares?: number;
  tags: string[];
}

export interface Dashboard {
  id: string;
  name: string;
  description: string;
  is_public: boolean;
  user_id: string | null;
  article_ids: string[];
  created_at: string;
  updated_at: string;
} 