'use server';

import { IProductListResponse } from 'types/schema/product.shema';
import requestAPI from '../request-api.controller';
import { EPaginationOrderString } from 'types/enum/pagination.enum';
import { IProductPaginationProps } from 'types/schema/pagination.schema';
import { toQueryArray } from '@/lib/utils';

export default async function getPaginatedProducts({
  page = 1,
  limit = 10,
  sort = 'created_at',
  order = EPaginationOrderString.DESC,
  title = '',
  productCode = '',
  categories = '',
  brands = '',
  tags = ''
}: IProductPaginationProps) {
  return await requestAPI<IProductListResponse>({
    endpoint: 'products/pagination',
    method: 'GET',
    authenticate: false,
    query: [
      ['page', `${page}`],
      ['limit', `${limit}`],
      ['sort', sort],
      ['order', order],
      ['title', title],
      ['productCode', productCode],
      ...toQueryArray({ query: tags, paramName: 'tags' }).map(([_, param]) => [
        param,
        '1'
      ]),
      ...toQueryArray({ query: categories, paramName: 'category_ids' }),
      ...toQueryArray({ query: brands, paramName: 'brand_ids' })
    ]
  });
}
``;
