'use server';

import { ICoupon } from 'types/schema/coupon.schema';
import requestAPI from '../request-api.controller';

interface IUpdateCouponActionProps {
  data: Partial<ICoupon>;
  method: 'POST' | 'PATCH';
  id?: string;
}

export default async function updateCoupons({
  data,
  method,
  id
}: IUpdateCouponActionProps) {
  return await requestAPI({
    method,
    endpoint: ['coupons', method === 'POST' ? '' : (id ?? '')]
      .filter((str) => str.length > 0)
      .join('/'),
    authenticate: true,
    body: JSON.stringify(data)
  });
}
