'use server';

import requestAPI from '../request-api.controller';
import { ICouponListResponse } from 'types/schema/coupon.schema';

export default async function getCoupons() {
  return await requestAPI<ICouponListResponse>({
    method: 'GET',
    endpoint: 'coupons',
    authenticate: true
  });
}
