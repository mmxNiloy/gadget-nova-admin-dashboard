import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as PromoDiscountTable } from '@/components/ui/table/data-table';
import { IPromotionalDiscount } from 'types/schema/product.shema';
import { columns } from './promotional-discount-tables/columns';
import { DataTableError } from '@/components/ui/table/data-table-error';
import { IPromotionalDiscountPaginationProps } from 'types/schema/pagination.schema';
import getPaginatedPromotionalDiscount from '@/app/(server)/actions/promotional-discount/get-paginated-promotional-discount.controller';

export default async function PromotionalDiscountListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const pageLimit = searchParamsCache.get('limit');
  const title = searchParamsCache.get('title') ?? '';
  const order = searchParamsCache.get('order');
  const sort = searchParamsCache.get('sort') as keyof IPromotionalDiscount;

  const filters: IPromotionalDiscountPaginationProps = {
    page,
    limit: pageLimit,
    title,
    order,
    sort
  };

  const promotionalDiscountData =
    await getPaginatedPromotionalDiscount(filters);

  if (!promotionalDiscountData.ok) {
    return (
      <DataTableError errorMessage={promotionalDiscountData.error.message} />
    );
  }

  const data = promotionalDiscountData.data;

  const promoDiscounts: IPromotionalDiscount[] = data.payload;
  const meta = data.meta;

  return (
    <PromoDiscountTable
      columns={columns}
      data={promoDiscounts}
      totalItems={meta.total}
      pageCount={meta.totalPages}
    />
  );
}
