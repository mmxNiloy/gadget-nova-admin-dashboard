'use server';

import { IBrandListResponse } from 'types/schema/product.shema';
import requestAPI from '../request-api.controller';
import { EPaginationOrderString } from 'types/enum/pagination.enum';
import { IBrandPaginationProps } from 'types/schema/pagination.schema';
import { toQueryArray } from '@/lib/utils';

export default async function getPaginatedBrands({
  page = 1,
  limit = 10,
  sort = 'created_at',
  order = EPaginationOrderString.DESC,
  name = '',
  categories = ''
}: IBrandPaginationProps) {
  return await requestAPI<IBrandListResponse>({
    endpoint: 'brand/pagination',
    method: 'GET',
    query: [
      ['page', `${page}`],
      ['limit', `${limit}`],
      ['sort', sort],
      ['order', order],
      ['name', name],
      ...toQueryArray({ paramName: 'category_ids', query: categories })
    ]
  });
}
