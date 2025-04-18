'use server';

import { ICategoryResponse } from 'types/schema/product.shema';
import requestAPI from '../request-api.controller';

interface IGetCategoryOptions {
  getSubcategories?: boolean;
}

export default async function getCategory(
  id: string,
  options?: IGetCategoryOptions
) {
  const prod = await requestAPI<ICategoryResponse>({
    endpoint: ['category', options?.getSubcategories ? 'subcategories' : '', id]
      .filter((str) => str.length > 0)
      .join('/'),
    method: 'GET'
  });

  return prod;
}
