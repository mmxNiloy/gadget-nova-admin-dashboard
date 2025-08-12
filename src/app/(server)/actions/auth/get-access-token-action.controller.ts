'use server';

import { getAccessToken, updateSession } from '@/lib/session';

export default async function getAccessTokenAction() {
  const token = await getAccessToken();

  if (!token) {
    // Try to refresh the token and get a new token
    const newToken = await updateSession();

    return newToken;
  }

  return token;
}
