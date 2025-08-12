'use server';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { SiteConfig } from '@/constants/site-config';
import refreshTokenAction from '@/app/(server)/actions/auth/refresh-token.controller';
import { Mutex } from 'async-mutex';

type AccessTokenPayload = {
  access_token: string;
};

type RefreshTokenPayload = {
  refresh_token: string;
};

type SessionPayload = (AccessTokenPayload | RefreshTokenPayload) & {
  expiresAt: Date;
};

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const secretKey = process.env.SESSION_SECRET;
const refreshSecretKey = process.env.REFRESH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const refreshEncodedKey = new TextEncoder().encode(refreshSecretKey);

type TKey = typeof encodedKey;

const refreshMutex = new Mutex();

export async function encrypt(
  payload: SessionPayload,
  key: TKey,
  expiresInMs: number
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(Math.floor((Date.now() + expiresInMs) / 1000))
    .sign(key);
}

export async function decrypt(session: string | undefined = '', key: TKey) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
      clockTolerance: '5s'
    });
    return payload;
  } catch (error) {
    console.log('[Session] > [decrypt()] > Failed to verify session');
  }
}

export async function createSession({
  access_token,
  refresh_token
}: {
  access_token: string;
  refresh_token: string;
}) {
  console.log('[Session] > [createSession()] > Creating session');

  const expiresAt = new Date(Date.now() + SiteConfig.sessionTTL);
  const refreshExpiresAt = new Date(Date.now() + SiteConfig.refreshTTL);
  const [session, refreshToken] = await Promise.all([
    encrypt({ access_token, expiresAt }, encodedKey, SiteConfig.sessionTTL),
    encrypt(
      { refresh_token, expiresAt: refreshExpiresAt },
      refreshEncodedKey,
      SiteConfig.refreshTTL
    )
  ]);
  const cookieStore = await cookies();

  // Set the access token cookie
  cookieStore.set(ACCESS_TOKEN_KEY, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  });

  // Set the refresh token cookie
  cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, {
    httpOnly: true,
    secure: true,
    expires: refreshExpiresAt,
    sameSite: 'lax',
    path: '/'
  });

  console.log('[Session] > [createSession()] > Session created');
}

export async function getAccessToken() {
  console.log('[Session] > [getAccessToken()] > Getting access token');
  const session = (await cookies()).get(ACCESS_TOKEN_KEY)?.value;
  const payload = await decrypt(session, encodedKey);

  if (!session || !payload) {
    console.log('[Session] > [getAccessToken()] > No access token found');
    return null;
  }

  console.log('[Session] > [getAccessToken()] > Access token found');

  return payload.access_token as string;
}

export async function getRefreshToken() {
  console.log('[Session] > [getRefreshToken()] > Getting refresh token');
  const session = (await cookies()).get(REFRESH_TOKEN_KEY)?.value;
  const payload = await decrypt(session, refreshEncodedKey);

  if (!session || !payload) {
    console.log('[Session] > [getRefreshToken()] > No refresh token found');
    return null;
  }

  console.log('[Session] > [getRefreshToken()] > Refresh token found');

  return payload.refresh_token as string;
}

export async function hasSession() {
  console.log('[Session] > [hasSession()] > Checking session');

  const session = (await cookies()).get(ACCESS_TOKEN_KEY)?.value;
  const payload = await decrypt(session, encodedKey);

  if (!session || !payload) {
    console.log('[Session] > [hasSession()] > No session found');
    return false;
  }

  console.log('[Session] > [hasSession()] > Session found');

  return true;
}

export async function updateSession() {
  return refreshMutex.runExclusive(async () => {
    console.log('[Session] > [updateSession()] > Updating session');

    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
    const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;
    const [payload, refreshPayload] = await Promise.all([
      decrypt(sessionToken, encodedKey),
      decrypt(refreshToken, refreshEncodedKey)
    ]);

    if (!refreshToken || !refreshPayload) {
      return null;
    }

    if (!payload?.access_token || !refreshPayload?.refresh_token) return null;

    // Task: Only refresh the access token if it's about to expire
    // That is, if the request received for an update is within 5 minutes
    // before the access token expires
    const accessTokenExpires = new Date(payload.expiresAt as string);

    const now = Date.now();
    const diff = accessTokenExpires.getTime() - now;
    const diffInMinutes = diff / (60 * 1000);
    if (diffInMinutes > 5) {
      console.log('[Session] > [updateSession()] > Access token not expired');
      return null;
    }

    const access_token = payload.access_token;
    const { refresh_token } = refreshPayload as RefreshTokenPayload;
    let newTokens: SessionPayload = {
      access_token: '',
      expiresAt: new Date()
    };

    try {
      const mTokenData = await refreshTokenAction({
        access_token: access_token as string,
        refresh_token: refresh_token as string
      });

      if (mTokenData.ok) {
        newTokens.access_token = mTokenData.data.payload.access_token;
        const sessionExpiresAt = new Date(Date.now() + SiteConfig.sessionTTL);
        newTokens.expiresAt = sessionExpiresAt;

        const refreshExpiresAt = new Date(Date.now() + SiteConfig.refreshTTL);
        const newRefreshToken = {
          refresh_token: mTokenData.data.payload.refresh_token,
          expiresAt: refreshExpiresAt
        };

        const [session, refresh] = await Promise.all([
          encrypt(newTokens, encodedKey, SiteConfig.sessionTTL),
          encrypt(newRefreshToken, refreshEncodedKey, SiteConfig.refreshTTL)
        ]);
        // Rewrite the cookies
        // Set the access token cookie
        cookieStore.set(ACCESS_TOKEN_KEY, session, {
          httpOnly: true,
          secure: true,
          expires: sessionExpiresAt,
          sameSite: 'lax',
          path: '/'
        });

        // Set the refresh token cookie
        cookieStore.set(REFRESH_TOKEN_KEY, refresh, {
          httpOnly: true,
          secure: true,
          expires: refreshExpiresAt,
          sameSite: 'lax',
          path: '/'
        });

        console.log('[Session] > Updated session');

        return newTokens.access_token;
      } else {
        console.log('[Session] > [updateSession()] > Session update failed');
        return null;
      }
    } catch (error) {
      console.log(
        '[Session] > [updateSession()] > Failed to update session',
        error
      );
      return null;
    }
  });
}

export async function deleteSession() {
  console.log('[Session] > Deleting session');
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
  console.log('[Session] > Session deleted');
}
