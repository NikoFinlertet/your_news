
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
  ai_tags: string[];
  
}
