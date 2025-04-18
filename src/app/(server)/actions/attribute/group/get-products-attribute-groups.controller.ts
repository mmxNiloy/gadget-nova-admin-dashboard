'use server';

import { IAttributeGroupListResponse } from 'types/schema/product.shema';
import requestAPI from '../../request-api.controller';

export default async function getProductAttributeGroups() {
  return await requestAPI<IAttributeGroupListResponse>({
    endpoint: 'attribute-group',
    method: 'GET',
    authenticate: false
  });
}
