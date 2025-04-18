'use server';

import requestAPI from '../../request-api.controller';

export default async function deleteAttributeValue({ id }: { id: string }) {
  return await requestAPI({
    method: 'DELETE',
    authenticate: true,
    endpoint: ['attribute-group', id].join('/')
  });
}
