'use server';

import { IProductListResponse } from 'types/schema/product.shema';
import requestAPI from '../request-api.controller';

export default async function getProductsByIdList(idList: string[]) {
  return await requestAPI<IProductListResponse>({
    endpoint: 'products/id/list',
    method: 'GET',
    query: idList.map((id) => ['ids', id])
  });
}
