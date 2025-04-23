'use server';

import { IPromotionListResponse } from 'types/schema/promotion.schema';
import requestAPI from '../../request-api.controller';
import { IPromotionPaginationProps } from 'types/schema/pagination.schema';
import { EPaginationOrderString } from 'types/enum/pagination.enum';
import { toQueryArray } from '@/lib/utils';

export default async function getPromotions({
  page = 1,
  limit = 10,
  sort,
  order = EPaginationOrderString.DESC,
  startDate = '',
  endDate = '',
  product_ids = ''
}: IPromotionPaginationProps) {
  return await requestAPI<IPromotionListResponse>({
    endpoint: ['promotions', 'pagination'].join('/'),
    method: 'GET',
    query: [
      ['page', `${page}`],
      ['limit', `${limit}`],
      ['sort', sort ?? ''],
      ['order', order],
      ['startDate', startDate],
      ['endDate', endDate],
      ...toQueryArray({ query: product_ids, paramName: 'product_ids' })
    ]
  });
}
