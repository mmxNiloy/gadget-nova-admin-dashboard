'use server';

import { IPromotionalDiscountResponse } from 'types/schema/product.shema';
import requestAPI from '../request-api.controller';

export default async function getPromotionalDiscount(id: string) {
  const prod = await requestAPI<IPromotionalDiscountResponse>({
    endpoint: ['promotional-discount', id].join('/'),
    method: 'GET'
  });

  return prod;
}
