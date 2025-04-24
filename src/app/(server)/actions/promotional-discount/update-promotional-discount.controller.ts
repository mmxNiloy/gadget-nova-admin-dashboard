'use server';

import {
  IPromotionalDiscount,
  IPromotionalDiscountResponse
} from 'types/schema/product.shema';
import requestAPI from '../request-api.controller';

interface IUpdateBrandActionProps {
  data: Pick<
    IPromotionalDiscount,
    'is_percentage' | 'amount' | 'startDate' | 'endDate' | 'product_id'
  >;
  method: 'POST' | 'PATCH';
  id?: string;
}

export default async function updatePromotionalDiscount({
  data,
  method,
  id
}: IUpdateBrandActionProps) {
  return await requestAPI<IPromotionalDiscountResponse>({
    method,
    endpoint: ['promotional-discount', method === 'POST' ? '' : (id ?? '')]
      .filter((str) => str.length > 0)
      .join('/'),
    authenticate: true,
    body: JSON.stringify({
      ...data
    })
  });
}
