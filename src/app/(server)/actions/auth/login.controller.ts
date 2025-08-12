'use server';

import { IUserAuthResponse } from 'types/schema/user.schema';
import requestAPI from '../request-api.controller';
import { createSession, deleteSession } from '@/lib/session';

type ILoginProps = (
  | {
      email: string;
    }
  | {
      phone: string;
    }
) & {
  password: string;
};

export default async function login(creds: ILoginProps) {
  const result = await requestAPI<IUserAuthResponse>({
    endpoint: ['auth', 'login'].join('/'),
    method: 'POST',
    body: JSON.stringify(creds)
  });

  if (!result.ok) {
    await deleteSession();
    return result;
  }

  await createSession({
    access_token: result.data.payload.access_token,
    refresh_token: result.data.payload.refresh_token
  });

  return result;
}
