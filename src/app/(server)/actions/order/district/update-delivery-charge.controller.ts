'use server';

import {
  DeliveryChargeSchema,
  IDistrictResponse
} from 'types/schema/order.schema';
import { z } from 'zod';
import requestAPI from '../../request-api.controller';

type DeliveryChargeSchemaType = z.infer<typeof DeliveryChargeSchema>;

export default async function updateDeliveryCharge(
  id: string,
  data: DeliveryChargeSchemaType
) {
  return await requestAPI<IDistrictResponse>({
    endpoint: ['districts', id, 'delivery-charge'].join('/'),
    method: 'PATCH',
    authenticate: true,
    body: JSON.stringify(data)
  });
}
