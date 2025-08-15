'use server';

import { ICategoryListResponse } from 'types/schema/product.shema';
import requestAPI from '../request-api.controller';
import { ICategoryPaginationProps } from 'types/schema/pagination.schema';
import { EPaginationOrderString } from 'types/enum/pagination.enum';

export default async function getSubcategories({
  page = 1,
  limit = 10,
  sort = 'created_at',
  order = EPaginationOrderString.DESC,
  name = '',
  isFeatured
}: ICategoryPaginationProps) {
  return await requestAPI<ICategoryListResponse>({
    method: 'GET',
    endpoint: ['category', 'subcategories'].join('/'),
    query: [
      ['page', `${page}`],
      ['limit', `${limit}`],
      ['sort', sort],
      ['order', order],
      ['name', name],
      isFeatured !== undefined ? ['isFeatured', isFeatured ? '1' : '0'] : []
    ].filter((item) => item.length > 1)
  });
}
