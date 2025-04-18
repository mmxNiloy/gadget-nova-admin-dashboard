'use server';

import requestAPI from '../request-api.controller';

export default async function deleteBrand({ id }: { id: string }) {
  return await requestAPI({
    method: 'DELETE',
    authenticate: true,
    endpoint: ['brand', id].join('/')
  });
}
