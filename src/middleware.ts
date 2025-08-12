import { NextRequest, NextResponse } from 'next/server';
import { hasSession, updateSession } from './lib/session';

export async function middleware(req: NextRequest) {
  console.log('[Middleware] > Checking session');
  await updateSession();
  const isLoggedIn = await hasSession();
  if (!isLoggedIn) {
    console.log('[Middleware] > Not logged in');
    return NextResponse.redirect(new URL('/', req.url));
  }

  console.log('[Middleware] > Logged in');
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};
