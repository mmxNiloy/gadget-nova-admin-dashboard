'use server';

import { IOrderPaginationProps } from 'types/schema/pagination.schema';
import requestAPI from '../request-api.action';
import { IOrderListResponse } from 'types/schema/order.schema';
import { EPaginationOrder } from 'types/enum/pagination.enum';

export default async function getPaginatedOrders({
  page = 1,
  limit = 10,
  sort = 'created_at',
  order = EPaginationOrder.DESC,
  name = '',
  status
}: IOrderPaginationProps) {
  const orders = await requestAPI<IOrderListResponse>({
    endpoint: 'orders/pagination',
    method: 'GET',
    authenticate: true,
    query: [
      ['page', `${page}`],
      ['limit', `${limit}`],
      ['sort', sort],
      ['order', `${order}`],
      ['name', name],
      status ? ['status', status] : []
    ].filter((arr) => arr.length > 0)
  });

  return orders;
}
