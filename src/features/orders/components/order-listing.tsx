import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as OrderTable } from '@/components/ui/table/data-table';
import { columns } from './order-tables/columns';
import { IOrder, TOrderStatus } from 'types/schema/order.schema';
import getPaginatedOrders from '@/app/(server)/actions/paginated/getPaginatedOrders';

export default async function OrdersListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const pageLimit = searchParamsCache.get('limit');
  const sort = searchParamsCache.get('sort') as keyof IOrder;
  const order = Number.parseInt(searchParamsCache.get('order'));
  const name = searchParamsCache.get('name') ?? '';
  const status = searchParamsCache.get('status') as TOrderStatus | undefined;

  const filters = {
    page,
    limit: pageLimit,
    sort,
    order,
    name,
    status
  };

  const brandsData = await getPaginatedOrders(filters);

  if (!brandsData.ok) {
    // TODO: Add a proper error state table here
    return <>Error Loading Data...</>;
  }

  const data = brandsData.data;

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
