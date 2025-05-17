/**
 * Интерфейс для дайджеста новостей
 * @property news_id - ID новости
 * @property created_at - Дата создания
 * @property user_id - ID пользователя
 */
export interface Digest{
  news_id: string;
  created_at: string;
  user_id: string;
}

/**
 * Интерфейс для связи между дайджестом и новостями
 * @property news_id - ID новости
 * @property digest_id - ID дайджеста
 * @property created_at - Дата создания связи
 */
export interface Digest_News{
  news_id: string;
  digest_id: string;
  created_at: string;
}

/**
 * Интерфейс для новостей
 * @property id - Уникальный идентификатор новости
 * @property created_at - Дата создания новости
 * @property user_id - ID пользователя, создавшего новость
 * @property summary - Краткое описание новости
 * @property text - Полный текст новости
 * @property ai_tags - Массив тегов, сгенерированных ИИ
 */
export interface News{
  id: string;
  created_at: string;
  user_id: string;
  summary: string;
  text: string;
  ai_tags: string[];
  
}

/**
 * Интерфейс для статьи
 * @property id - Уникальный идентификатор статьи
 * @property title - Заголовок статьи
 * @property snippet - Краткое описание
 * @property content - Полный текст статьи
 * @property source_url - URL источника
 * @property image_url - URL изображения
 * @property created_at - Дата создания
 * @property tags - Массив тегов
 */
export interface Article {
  id: string;
  title: string;
  snippet: string;
  content: string;
  source_url?: string;
  image_url?: string;
  created_at: string;
  tags: string[];
}

/**
 * Интерфейс для дашборда
 * @property id - Уникальный идентификатор дашборда
 * @property key - Уникальный ключ дашборда
 * @property title - Название дашборда
 * @property description - Описание дашборда
 * @property articles - Массив ID статей
 * @property created_at - Дата создания
 * @property updated_at - Дата обновления
 */
export interface Dashboard {
  id: string;
  key: string;
  title: string;
  description: string;
  articles: string[];
  created_at: string;
  updated_at: string;
}
