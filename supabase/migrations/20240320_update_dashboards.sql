-- Добавляем новые колонки в таблицу Dashboards
ALTER TABLE dashboards
ADD COLUMN user_id UUID REFERENCES auth.users(id),
ADD COLUMN article_ids UUID[] DEFAULT '{}';

-- Создаем индекс для быстрого поиска по user_id
CREATE INDEX idx_dashboards_user_id ON dashboards(user_id);

-- Создаем GIN индекс для быстрого поиска по article_ids
CREATE INDEX idx_dashboards_article_ids ON dashboards USING GIN (article_ids); 