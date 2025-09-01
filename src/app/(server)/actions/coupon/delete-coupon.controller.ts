'use server';

import requestAPI from '../request-api.controller';

export default async function deleteCoupon({ id }: { id: string }) {
  return await requestAPI({
    method: 'DELETE',
    endpoint: ['coupons', id].join('/'),
    authenticate: true
  });
}
