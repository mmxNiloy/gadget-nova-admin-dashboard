'use server';

import { IAttributeValueListResponse } from 'types/schema/product.shema';
import requestAPI from '../../request-api.controller';

export default async function getProductAttributeValues() {
  return await requestAPI<IAttributeValueListResponse>({
    endpoint: 'attribute-value',
    method: 'GET',
    authenticate: false
  });
}
