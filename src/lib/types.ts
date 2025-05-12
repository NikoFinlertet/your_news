export interface Article {
  id: string;
  created_at: string;
  title: string;
  snippet: string;
  content: string;
  image_url?: string | null;
  source_url: string;
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