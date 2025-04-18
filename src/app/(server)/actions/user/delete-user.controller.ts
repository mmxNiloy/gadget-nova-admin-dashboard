'use server';

import requestAPI from '../request-api.controller';

export default async function deleteUser({ id }: { id: string }) {
  return await requestAPI({
    method: 'PATCH',
    authenticate: true,
    body: JSON.stringify({
      is_active: 0
    }),
    endpoint: ['user', 'admin', id].join('/')
  });
}
