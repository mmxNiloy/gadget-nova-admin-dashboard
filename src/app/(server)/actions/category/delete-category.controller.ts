'use server';

import requestAPI from '../request-api.controller';

export default async function deleteCategory({ id }: { id: string }) {
  return await requestAPI({
    method: 'DELETE',
    authenticate: true,
    endpoint: ['category', id].join('/')
  });
}
