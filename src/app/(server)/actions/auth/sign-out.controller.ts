'use server';

import { cookies } from 'next/headers';
import EnvironmentError from 'types/error/EnvironmentError';
import requestAPI from '../request-api.controller';
import { IErrorResponseBase } from 'types/schema/base.schema';

export default async function signOut() {
  try {
    const sessionKey = process.env.COOKIE_SESSION;
    const refreshTokenKey = process.env.COOKIE_REFRESH_TOKEN;
    const accessTokenExpiresAtKey = process.env.COOKIE_ACCESS_TOKEN_EXPIRES_AT;
    const accessTokenKey = process.env.COOKIE_ACCESS_TOKEN;

    if (
      !sessionKey ||
      !refreshTokenKey ||
      !accessTokenKey ||
      !accessTokenExpiresAtKey
    ) {
      throw new EnvironmentError(
        'Cannot find session key, access token key, or refresh token key in the environment.'
      );
    }

    const res = await requestAPI({
      endpoint: ['auth', 'logout'].join('/'),
      method: 'GET',
      authenticate: true
    });

    const cookieStore = await cookies();
    cookieStore.delete(sessionKey);
    cookieStore.delete(accessTokenKey);
    cookieStore.delete(accessTokenExpiresAtKey);
    cookieStore.delete(refreshTokenKey);

    return res;
  } catch (error) {
    return {
      ok: false as false,
      error: {
        error: true,
        statusCode: 500,
        message: (error as EnvironmentError).message
      } as IErrorResponseBase
    };
  }
}
