'use server';

import { TOrderStatus } from 'types/schema/order.schema';
import requestAPI from '../request-api.controller';

interface IUpdateBrandActionProps {
  data: {
    status: TOrderStatus;
  };
  id: string;
}

export default async function updateOrderStatus({
  data,
  id
}: IUpdateBrandActionProps) {
  return await requestAPI({
    method: 'PUT',
    endpoint: ['orders', 'update-status', id].join('/'),
    authenticate: true,
    body: JSON.stringify(data)
  });
}
