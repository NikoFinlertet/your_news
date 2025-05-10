# Новостной дашборд

Веб-приложение для отображения персонализированных новостных дашбордов из Supabase.

## Установка

1. Клонируйте репозиторий
2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env.local` и добавьте следующие переменные окружения:
```
NEXT_PUBLIC_SUPABASE_URL=https://bobus.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=Amogus
```

## Запуск

Для запуска в режиме разработки:
```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

## Сборка для продакшена

```bash
npm run build
npm start
```

## Технологии

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- date-fns 
