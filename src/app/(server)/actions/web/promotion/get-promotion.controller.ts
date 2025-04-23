'use server';

import { IPromotionResponse } from 'types/schema/promotion.schema';
import requestAPI from '../../request-api.controller';

export default async function getPromotion(id: string) {
  return await requestAPI<IPromotionResponse>({
    endpoint: ['promotions', id].join('/'),
    method: 'GET'
  });
}
