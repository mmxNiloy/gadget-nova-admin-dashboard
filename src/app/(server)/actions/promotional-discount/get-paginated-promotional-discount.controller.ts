'use server';

import { IPromotionalDiscountListResponse } from 'types/schema/product.shema';
import requestAPI from '../request-api.controller';
import { EPaginationOrderString } from 'types/enum/pagination.enum';
import { IPromotionalDiscountPaginationProps } from 'types/schema/pagination.schema';

export default async function getPaginatedPromotionalDiscount({
  page = 1,
  limit = 10,
  sort = 'created_at',
  order = EPaginationOrderString.DESC,
  title = ''
}: IPromotionalDiscountPaginationProps) {
  return await requestAPI<IPromotionalDiscountListResponse>({
    endpoint: 'promotional-discount/pagination',
    method: 'GET',
    authenticate: false,
    query: [
      ['page', `${page}`],
      ['limit', `${limit}`],
      ['sort', sort],
      ['order', order],
      ['title', title]
    ]
  });
}
