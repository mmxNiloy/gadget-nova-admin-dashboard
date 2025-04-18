'use server';

import { ICategoryListResponse } from 'types/schema/product.shema';
import requestAPI from '../request-api.controller';
import { EPaginationOrderString } from 'types/enum/pagination.enum';
import { ICategoryPaginationProps } from 'types/schema/pagination.schema';

export default async function getPaginatedCategories({
  page = 1,
  limit = 10,
  sort = 'created_at',
  order = EPaginationOrderString.DESC,
  name = ''
}: ICategoryPaginationProps) {
  return await requestAPI<ICategoryListResponse>({
    endpoint: 'category/pagination',
    method: 'GET',
    query: [
      ['page', `${page}`],
      ['limit', `${limit}`],
      ['sort', sort],
      ['order', order],
      ['name', name]
    ]
  });
}
