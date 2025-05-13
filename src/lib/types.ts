export interface Article {
  id: string;
  created_at: string;
  title: string;
  snippet: string;
  description?: string;
  content: string;
  image_url?: string | null;
  source_url?: string;
  url?: string;
  published_at?: string;
  updated_at?: string;
  dashboard_key?: string;
  source?: string;
  author?: string;
  views?: number;
  likes?: number;
  tags: string[];
}

export interface Dashboard {
  id: string;
  created_at: string;
  articles: string[];
  key: string;
  public: boolean;
}


export interface Tag {
  id_articles: string;
  name: string;
}