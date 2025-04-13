'use server';

import requestAPI from '../request-api.action';
import { IUserResponse } from 'types/schema/user.schema';

export interface IUserCreationDTO {
  name: string;
  email: string;
  password: string;
  role: string;
  is_active: number;
}

interface IUpdateUserActionProps {
  data: IUserCreationDTO;
  method: 'POST' | 'PATCH';
  id?: string;
}

export default async function updateUser({
  data,
  method,
  id
}: IUpdateUserActionProps) {
  return await requestAPI<IUserResponse>({
    method,
    endpoint:
      method === 'POST'
        ? ['user', 'create-user'].join('/')
        : ['user', 'admin', id].join('/'),
    body: JSON.stringify(data),
    authenticate: true
  });
}
