import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as PromotionTable } from '@/components/ui/table/data-table';
import { columns } from './user-tables/columns';
import { DataTableError } from '@/components/ui/table/data-table-error';
import getPromotions from '@/app/(server)/actions/web/promotion/get-promotions.controller';
import { IPromotionPaginationProps } from 'types/schema/pagination.schema';
import { IPromotion } from 'types/schema/promotion.schema';

type PromotionListingPage = {};

export default async function PromotionListingPage({}: PromotionListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const pageLimit = searchParamsCache.get('limit');

  const filters: IPromotionPaginationProps = {
    page,
    limit: pageLimit
  };

  const promotionData = await getPromotions({ ...filters });

  if (!promotionData.ok) {
    return <DataTableError errorMessage={promotionData.error.message} />;
  }

  const data = promotionData.data;

  const promotions: IPromotion[] = data.payload;

  return (
    <PromotionTable
      columns={columns}
      data={promotions}
      totalItems={promotions.length}
      pageCount={1}
    />
  );
}
