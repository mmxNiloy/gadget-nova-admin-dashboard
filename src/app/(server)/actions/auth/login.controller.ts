'use server';

import { IUserAuthResponse } from 'types/schema/user.schema';
import requestAPI from '../request-api.controller';
import { createSession, deleteSession } from '@/lib/session';
import { EUserRole } from 'types/enum/user-role.enum';
import ActionResponseBuilder from 'types/ActionResponseBuilder';

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

  const isAdmin = result.data.payload.role !== EUserRole.USER;

  if (!isAdmin) {
    await deleteSession();
    return ActionResponseBuilder.error({
      statusCode: 403,
      error: true,
      path: 'auth/login',
      message: 'You are not authorized to access this page.'
    }).toJSON();
  }

  await createSession({
    access_token: result.data.payload.access_token,
    refresh_token: result.data.payload.refresh_token
  });

  return result;
}
