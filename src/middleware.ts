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
  
  if (!user_id) {
    // Not to spam redirects
    if (req.nextUrl.pathname === '/unauthorized')
      return res;

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

  if (
    (req.nextUrl.pathname !== '/unauthorized' && req.nextUrl.pathname !== '/settings')
    && (!data[0].description
    || !data[0].queries
    || !data[0].cron_pattern
    || !data[0].timezone)
  ) {
    // The profile is not completed
    console.log('Profile is not completed: ', user_id, req.nextUrl.pathname, data[0]);

    if (!user_id_in_params) {
      return NextResponse.redirect(new URL('/settings'));
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



