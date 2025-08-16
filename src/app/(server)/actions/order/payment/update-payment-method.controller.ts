'use server';

import { PaymentMethod } from '@/constants/site-payment-methods';
import requestAPI from '../../request-api.controller';

interface IUpdateBrandActionProps {
  data: {
    paymentMethod: PaymentMethod;
  };
  id: string;
}

export default async function updatePaymentMethod({
  data,
  id
}: IUpdateBrandActionProps) {
  return await requestAPI({
    method: 'PATCH',
    endpoint: ['payment', id].join('/'),
    authenticate: true,
    body: JSON.stringify(data)
  });
}
