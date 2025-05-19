export interface Digest{
  id: string;
  created_at: string;
  user_id: string;
}


export interface Digest_News{
  news_id: string[];
  digest_id: string;
  created_at: string;
}

export interface News{
  id: string;
  created_at: string;
  user_id: string;
  summary: string;
  text: string;
  ai_title: string;
  ai_tags: string[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  summary?: string;
  tags?: string[];
  created_at: string;
  author?: string;
  source?: string;
  url?: string;
}
