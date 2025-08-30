'use server';

import requestAPI from '../request-api.controller';
import { ICouponResponse } from 'types/schema/coupon.schema';

export default async function getCoupon(id: string) {
  return await requestAPI<ICouponResponse>({
    method: 'GET',
    endpoint: ['coupons', id].join('/'),
    authenticate: true
  });
}
