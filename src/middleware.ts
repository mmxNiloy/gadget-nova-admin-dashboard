import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { IUserAuthResponse } from 'types/schema/user.schema';

export default async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const sessionKey = process.env.NEXT_PUBLIC_COOKIE_SESSION;
  const accessTokenKey = process.env.NEXT_PUBLIC_COOKIE_ACCESS_TOKEN;
  const refreshTokenKey = process.env.NEXT_PUBLIC_COOKIE_REFRESH_TOKEN;
  const authTokenSecret = process.env.NEXT_PUBLIC_AUTH_SECRET;
  const accessTokenExpiresAtKey = process.env.COOKIE_ACCESS_TOKEN_EXPIRES_AT;

  if (
    !accessTokenKey ||
    !refreshTokenKey ||
    !authTokenSecret ||
    !sessionKey ||
    !accessTokenExpiresAtKey
  ) {
    return NextResponse.redirect(new URL('/?environment-error=true', req.url));
  }

  const sessionCookie = cookieStore.get(sessionKey);
  const accessToken = cookieStore.get(accessTokenKey)?.value;
  const refreshToken = cookieStore.get(refreshTokenKey)?.value;

  // No session or tokens, redirect to login
  if (!sessionCookie || !accessToken || !refreshToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    const sessionExpiry = Number.parseInt(
      cookieStore.get(accessTokenExpiresAtKey)?.value ?? '0'
    );
    const now = Date.now();

    if (sessionExpiry > now) {
      return NextResponse.next();
    }

    const response = await fetch(
      [
        process.env.NEXT_PUBLIC_API_BASE_URL,
        process.env.NEXT_PUBLIC_API_VERSION,
        'auth',
        'refresh-token'
      ].join('/'),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
        },
        body: JSON.stringify({ refreshToken })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const res = (await response.json()) as IUserAuthResponse;

    const expiresAt = Date.now() + 900000;

    // Store the access token
    cookieStore.set(accessTokenKey, res.payload.access_token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 15 * 60
    });

    cookieStore.set(refreshTokenKey, res.payload.refresh_token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 7 * 24 * 60 * 60 // 7 days (refresh token expiry)
    });

    cookieStore.set(accessTokenExpiresAtKey, expiresAt.toString(), {
      httpOnly: true,
      sameSite: 'strict',
      secure: false
    });

    return NextResponse.next();
  } catch (error) {
    console.error('[Middleware] Invalid session:', error);
    // Clear cookies and redirect to login
    cookieStore.delete(accessTokenKey);
    cookieStore.delete(refreshTokenKey);
    cookieStore.delete(sessionKey);
    return NextResponse.redirect(
      new URL('/?refresh-token-error=true', req.url)
    );
  }
}

export const config = {
  matcher: ['/dashboard/:path*']
};
