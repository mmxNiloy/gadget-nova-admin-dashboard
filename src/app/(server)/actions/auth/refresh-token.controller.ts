'use server';

import { IUserAuthResponse } from 'types/schema/user.schema';
import requestAPI from '../request-api.controller';

export default async function refreshTokenAction({
  refresh_token,
  access_token
}: {
  refresh_token: string;
  access_token?: string;
}) {
  return await requestAPI<IUserAuthResponse>({
    endpoint: ['auth', 'refresh-token'].join('/'),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    },
    body: JSON.stringify({ refreshToken: refresh_token }),
    overrideHeaders: true
  });
}
