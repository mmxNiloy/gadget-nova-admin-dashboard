'use server';

import requestAPI from '../request-api.controller';

export default async function deleteProduct({ id }: { id: string }) {
  return await requestAPI({
    method: 'DELETE',
    authenticate: true,
    endpoint: ['products', id].join('/')
  });
}
