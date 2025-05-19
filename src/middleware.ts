import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { setCookie } from '@/lib/cookies';
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();


  const user_id = req.nextUrl.searchParams.get('yournews_user_id');
  
  if (!user_id) {
    if (req.cookies.get('yournews_user_id')){
      return res;
    }
    
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }  
  
  const response = NextResponse.redirect(req.nextUrl.pathname);
  response.cookies.set("yournews_user_id", user_id);
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};



