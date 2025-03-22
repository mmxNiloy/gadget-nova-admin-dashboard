'use server';

import { IProductListResponse } from 'types/schema/product.shema';
import requestAPI from '../request-api.action';
import { EPaginationOrder } from 'types/enum/pagination.enum';
import { IProductPaginationProps } from 'types/schema/pagination.schema';
import { toQueryArray } from '@/lib/utils';

export default async function getPaginatedProducts({
  page = 1,
  limit = 10,
  sort = 'created_at',
  order = EPaginationOrder.DESC,
  title = '',
  productCode = '',
  categories = '',
  brands = ''
}: IProductPaginationProps) {
  return await requestAPI<IProductListResponse>({
    endpoint: 'products/pagination',
    method: 'GET',
    authenticate: false,
    query: [
      ['page', `${page}`],
      ['limit', `${limit}`],
      ['sort', sort],
      ['order', `${order}`],
      ['title', title],
      ['productCode', productCode],
      ...toQueryArray({ query: categories, paramName: 'category_ids' }),
      ...toQueryArray({ query: brands, paramName: 'brand_ids' })
    ]
  });
}
