'use server';

import { IPromotionResponse } from 'types/schema/promotion.schema';
import requestAPI from '../../request-api.controller';

export interface IPromotionCreationDTO {
  title: string;
  subTitle: string;
  startDate?: string;
  endDate?: string;
  promotionImage?: string;
  product_id: string;
}

interface IUpdatePromotionActionProps {
  data: FormData;
  method: 'POST' | 'PATCH';
  id?: string;
}

export default async function updatePromotion({
  data,
  method,
  id
}: IUpdatePromotionActionProps) {
  return await requestAPI<IPromotionResponse>({
    method,
    endpoint: ['promotions', method === 'POST' ? '' : id].join('/'),
    body: data,
    asFormData: true,
    authenticate: true
  });
}
