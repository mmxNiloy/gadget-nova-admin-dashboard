'use server';

import { cookies } from 'next/headers';
import EnvironmentError from 'types/error/EnvironmentError';
import jwt from 'jsonwebtoken';
import { IUserAuth } from 'types/schema/user.schema';

export default async function getSession() {
  try {
    console.debug('[Start] Get session');
    const sessionKey = process.env.COOKIE_SESSION;
    const authTokenSecret = process.env.AUTH_SECRET;

    if (!sessionKey || !authTokenSecret) {
      throw new EnvironmentError(
        'Cannot find auth token key and auth token secret in the environment.'
      );
    }

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(sessionKey);
    if (!sessionCookie) {
      console.debug('[End] Get session > No session cookie found');
      return undefined;
    }

    const sess = jwt.verify(sessionCookie.value, authTokenSecret) as IUserAuth;

    console.debug('[End] Get session > Session data:', sess);

    return sess;
  } catch (error) {
    console.debug('[Error] Get session error', error);
    return undefined;
  }
}
