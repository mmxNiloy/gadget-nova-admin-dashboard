import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as OrderTable } from '@/components/ui/table/data-table';
import { columns } from './order-tables/columns';
import { IOrder, TOrderStatus } from 'types/schema/order.schema';
import getPaginatedOrders from '@/app/(server)/actions/order/get-paginated-order.controller';
import { EPaginationOrderString } from 'types/enum/pagination.enum';
import { DataTableError } from '@/components/ui/table/data-table-error';
import { IOrderPaginationProps } from 'types/schema/pagination.schema';

export default async function OrdersListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const pageLimit = searchParamsCache.get('limit');
  const sort = searchParamsCache.get('sort') as keyof IOrder;
  const order = searchParamsCache.get('order') ?? EPaginationOrderString.DESC;
  const name = searchParamsCache.get('name') ?? '';
  const email = searchParamsCache.get('email') ?? '';
  const phone = searchParamsCache.get('phone') ?? '';
  let orderId = Number.parseInt(searchParamsCache.get('orderId') ?? '0');
  const status = searchParamsCache.get('status') as TOrderStatus | undefined;

  if (!Number.isInteger(orderId)) {
    orderId = 0;
  }

  const filters: IOrderPaginationProps = {
    page,
    limit: pageLimit,
    sort,
    order,
    name,
    email,
    phone,
    orderId,
    status
  };

  const orderData = await getPaginatedOrders(filters);

  if (!orderData.ok) {
    return <DataTableError errorMessage={orderData.error.message} />;
  }

  const data = orderData.data;

  const orders: IOrder[] = data.payload;

  return (
    <OrderTable
      columns={columns}
      data={orders}
      totalItems={data.meta.total}
      pageCount={data.meta.totalPages}
    />
  );
}
