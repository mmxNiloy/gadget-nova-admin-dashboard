'use server';

import requestAPI from '../../request-api.controller';

export default async function deletePromotion({ id }: { id: string }) {
  return await requestAPI({
    method: 'DELETE',
    authenticate: true,
    endpoint: ['promotions', id].join('/')
  });
}
