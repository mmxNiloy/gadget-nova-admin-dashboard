'use server';

import { cookies } from 'next/headers';
import EnvironmentError from 'types/error/EnvironmentError';
import jwt from 'jsonwebtoken';
import { IUserAuth } from 'types/schema/user.schema';

export default async function getSession() {
  try {
    const sessionKey = process.env.COOKIE_SESSION;
    const authTokenSecret = process.env.AUTH_SECRET;

    if (!sessionKey || !authTokenSecret) {
      throw new EnvironmentError(
        'Cannot find auth token key and auth token secret in the environment.'
      );
    }
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(sessionKey);
    if (!sessionCookie) return undefined;

    return jwt.verify(sessionCookie.value, authTokenSecret) as IUserAuth;
  } catch (error) {
    return undefined;
  }
}
