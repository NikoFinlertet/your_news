/*
    Во имя Отца, Сына и Святого Git'а,
Аминь.

О, Великий Компилятор, внемли мольбам страждущих разработчиков!
Избавь нас от циклов бесконечных, от NullPointer’ов внезапных,
От кода, что запутаннее паутины в подвале старой библиотеки.
Спаси от переменных без имени, от функций-титанов на тысячу строк,
От мистических багов, что исчезают при взгляде ментора.

Дай нам силу удалить legacy, что тянется, как лапша, в бесконечность,
И мудрость, чтобы комментарии писать, а не надеяться на память.
Научи нас благодати рефакторинга, терпению Code Review,
И осени лучом автотестов, дабы не трепетать перед деплоем в пятницу.

Защити, о Алгоритмов Покровитель, от искушения скопировать с Stack Overflow,
И вразуми коллег, что плодят магические числа и хардкодят святые конфиги.
Пусть документация не будет мифом, а CI/CD не станет адом.
Да приидет Pull Request без конфликтов, и да минует нас гнев тимлида.

Во имя Безотказного Сервера, Юзабилити и Чистой Архитектуры,
Аминь.

P.S.: И прости нам наши костыли, ибо мы не ведаем, что творим.
             😇 Ctrl+S, Ctrl+S, Ctrl+S…

// Автор: страдалец, познавший JavaScript без TypeScript.
    */



import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const USER_ID_IN_COOKIES = 'yournews_user_id';
const USER_ID_IN_SEARCH_PARAMS = 'user_id';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();

  const user_id_in_params = req.nextUrl.searchParams.get(USER_ID_IN_SEARCH_PARAMS);
  const user_id_in_cookies = req.cookies.get(USER_ID_IN_COOKIES)?.value;

  const user_id = user_id_in_params || user_id_in_cookies;


  // Not to spam redirects
  if (req.nextUrl.pathname === '/unauthorized' || req.nextUrl.pathname === '/home') {
    return res;
  }
  
  if (!user_id) {
    // No user_id provided neither in url searchParams nor in cookies
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // Check user_id validity
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user_id);
  if (error) {
    console.error('Supabase error:', error);
    return res;
  }

  if (!data || data.length === 0) {
    console.log('User not found: ', user_id);
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // Check user sources
  const { data: sources, error: sourcesError } = await supabase
    .from('user_sources')
    .select('source_id')
    .eq('user_id', user_id);

  if (sourcesError) {
    console.error('Supabase error:', sourcesError);
    return res;
  }
/*
  if (
    (req.nextUrl.pathname !== '/unauthorized' && req.nextUrl.pathname !== '/settings')
    && (!data[0].description
    || !data[0].ai_profile
    || !data[0].name
    || !data[0].queries
    || !data[0].cron_pattern
    || !data[0].timezone
    || !sources || sources.length === 0)
  ) {
    // The profile is not completed
    console.log('Profile is not completed: ', user_id, req.nextUrl.pathname);

    if (!user_id_in_params) {
      return NextResponse.redirect(new URL('/settings', req.url));
    }


    // Delete user_id from searchParams
    const url = req.nextUrl.clone();
    url.searchParams.delete('user_id');
    req.nextUrl.pathname = url.pathname;
    req.nextUrl.search = url.search;

    const response = NextResponse.redirect(new URL('/settings', req.url));
    // Update cookies
    response.cookies.set(USER_ID_IN_COOKIES, user_id);
    
    return response;
  }
*/
  if (!user_id_in_params) {
    return res;
  }

  // Delete user_id from searchParams
  const url = req.nextUrl.clone();
  url.searchParams.delete('user_id');
  req.nextUrl.pathname = url.pathname;
  req.nextUrl.search = url.search;

  const response = NextResponse.redirect(url);
  // Update cookies
  response.cookies.set(USER_ID_IN_COOKIES, user_id);
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};



