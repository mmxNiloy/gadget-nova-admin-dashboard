'use server';

import requestAPI from '../../request-api.controller';
import { IDistrictListResponse } from 'types/schema/order.schema';

export default async function getAllDistricts(name?: string) {
  const districts = await requestAPI<IDistrictListResponse>({
    endpoint: 'districts',
    method: 'GET',
    query: [['name', name ?? '']]
  });

  return districts;
}
