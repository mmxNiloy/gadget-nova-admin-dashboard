'use server';

import requestAPI from '../request-api.controller';
import { deleteSession } from '@/lib/session';

export default async function signOutAction() {
  return await Promise.all([
    requestAPI({
      method: 'GET',
      endpoint: 'auth/logout',
      authenticate: true
    }),
    deleteSession()
  ]);
}
