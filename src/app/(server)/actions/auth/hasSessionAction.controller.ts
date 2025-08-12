'use server';

import { hasSession, updateSession } from '@/lib/session';

export default async function hasSessionAction() {
  const result = await hasSession();

  if (!result) {
    // try to refresh session
    const newToken = await updateSession();

    return !!newToken;
  }

  return result;
}
