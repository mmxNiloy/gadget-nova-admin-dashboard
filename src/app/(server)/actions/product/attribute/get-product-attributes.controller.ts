'use server';

import { IProductAttributeListResponse } from 'types/schema/product.shema';
import requestAPI from '../../request-api.controller';

export default async function getProductAttributes() {
  return await requestAPI<IProductAttributeListResponse>({
    endpoint: 'product-attribute',
    method: 'GET',
    authenticate: false
  });
}
