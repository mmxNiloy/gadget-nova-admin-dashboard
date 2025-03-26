'use server';

import requestAPI from './request-api.action';
import { IOrderResponse } from 'types/schema/order.schema';

export default async function getOrder(id: string) {
  const order = await requestAPI<IOrderResponse>({
    endpoint: ['orders', id].join('/'),
    method: 'GET',
    authenticate: true
  });

  return order;
}
