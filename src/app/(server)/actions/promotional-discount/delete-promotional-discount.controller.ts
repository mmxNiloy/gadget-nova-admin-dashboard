'use server';

import requestAPI from '../request-api.controller';

export default async function deletePromotionalDiscount({
  id
}: {
  id: string;
}) {
  return await requestAPI({
    endpoint: ['promotional-discount', id].join('/'),
    method: 'DELETE',
    authenticate: true
  });
}
