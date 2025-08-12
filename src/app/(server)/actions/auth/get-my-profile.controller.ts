'use server';

import { IUserProfile } from 'types/schema/user.schema';
import requestAPI from '../request-api.controller';

export default async function getMyProfile() {
  const result = await requestAPI<IUserProfile>({
    endpoint: 'user/profile',
    method: 'GET',
    authenticate: true
  });

  if (!result.ok) {
    return null;
  }

  return result.data.payload;
}
