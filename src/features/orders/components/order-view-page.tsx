import { notFound } from 'next/navigation';
import OrderForm from './order-form';
import { ICategoryListResponse } from 'types/schema/product.shema';
import { IOrderResponse } from 'types/schema/order.schema';
import getOrder from '@/app/(server)/actions/getOrder';

interface IOrderViewPageProps {
  orderId: string;
  categories?: ICategoryListResponse;
  subCategories?: ICategoryListResponse;
}

export default async function OrderViewPage({
  orderId,
  categories,
  subCategories
}: IOrderViewPageProps) {
  let order: IOrderResponse | undefined;
  let pageTitle = 'Place New Order';

  if (orderId !== 'new') {
    const data = await getOrder(orderId);
    if (!data.ok) {
      console.error('[OrderViewPage] Failed to get order >', data.error);
      notFound();
    }

    pageTitle = `Edit Order`;
    order = data.data;
  }

  return <OrderForm initialData={order?.payload} pageTitle={pageTitle} />;
}
