import { notFound } from 'next/navigation';
import { IOrderResponse } from 'types/schema/order.schema';
import getOrder from '@/app/(server)/actions/order/get-order.controller';
import OrderDetailsPage from './order-details-page';

interface IOrderViewPageProps {
  orderId: string;
}

export default async function OrderViewPage({ orderId }: IOrderViewPageProps) {
  let order: IOrderResponse | undefined;
  const data = await getOrder(orderId);
  if (!data.ok) {
    console.error('[OrderViewPage] Failed to get order >', data.error);
    notFound();
  }

  order = data.data;

  return <OrderDetailsPage data={order.payload} />;
}
