'use server';

import { ICategoryListResponse } from 'types/schema/product.shema';
import requestAPI from '../request-api.controller';

interface IGetCategoryOptions {
  getSubcategories?: boolean;
}

export default async function getCategories(options?: IGetCategoryOptions) {
  return await requestAPI<ICategoryListResponse>({
    method: 'GET',
    endpoint: ['category', options?.getSubcategories ? 'subcategories' : '']
      .filter((str) => str.length > 0)
      .join('/')
  });
}
