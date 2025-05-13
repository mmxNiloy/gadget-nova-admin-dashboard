'use server';

import { IUserAuthResponse } from 'types/schema/user.schema';
import requestAPI from '../request-api.controller';
import { cookies } from 'next/headers';
import EnvironmentError from 'types/error/EnvironmentError';
import jwt from 'jsonwebtoken';
import { IErrorResponseBase } from 'types/schema/base.schema';

interface ISignInProps {
  email: string;
  password: string;
  remember_me?: string;
}

export default async function signIn({
  email,
  password,
  remember_me
}: ISignInProps) {
  try {
    const sessionKey = process.env.COOKIE_SESSION;
    const refreshTokenKey = process.env.COOKIE_REFRESH_TOKEN;
    const accessTokenKey = process.env.COOKIE_ACCESS_TOKEN;
    const accessTokenExpiresAtKey = process.env.COOKIE_ACCESS_TOKEN_EXPIRES_AT;
    const authTokenSecret = process.env.AUTH_SECRET;

    if (
      !sessionKey ||
      !authTokenSecret ||
      !refreshTokenKey ||
      !accessTokenKey ||
      !accessTokenExpiresAtKey
    ) {
      throw new EnvironmentError(
        'Cannot find auth token key and auth token secret in the environment.'
      );
    }

    const res = await requestAPI<IUserAuthResponse>({
      endpoint: ['auth', 'login'].join('/'),
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) return res;

    // Store the cookies
    const cookieStore = await cookies();

    const expiresAt = Date.now() + 900000;

    // Store the session info
    const data = { ...res.data.payload, expiresAt };
    const jwtData = jwt.sign(data, authTokenSecret);
    cookieStore.set(sessionKey, jwtData, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });

    // Store the access token
    cookieStore.set(accessTokenKey, res.data.payload.access_token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60
    });

    cookieStore.set(accessTokenExpiresAtKey, expiresAt.toString(), {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });

    cookieStore.set(refreshTokenKey, res.data.payload.refresh_token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 // 7 days (refresh token expiry)
    });

    return res;
  } catch (error) {
    return {
      ok: false as false,
      error: {
        statusCode: 500,
        message: (error as EnvironmentError).message,
        error: true
      } as IErrorResponseBase
    };
  }
}
