import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as BrandTable } from '@/components/ui/table/data-table';
import { columns } from './brand-tables/columns';
import { IBrand } from 'types/schema/product.shema';
import { EPaginationOrderString } from 'types/enum/pagination.enum';
import { IBrandPaginationProps } from 'types/schema/pagination.schema';
import getPaginatedBrands from '@/app/(server)/actions/brand/get-paginated-brand.controller';
import { DataTableError } from '@/components/ui/table/data-table-error';

export default async function BrandsListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const name = searchParamsCache.get('name') ?? '';
  const sort = searchParamsCache.get('sort') as keyof IBrand;
  const order = searchParamsCache.get('order') ?? EPaginationOrderString.DESC;
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories') ?? '';

  const filters: IBrandPaginationProps = {
    page,
    limit: pageLimit,
    name,
    sort,
    order,
    categories
  };

  const brandsData = await getPaginatedBrands(filters);

  if (!brandsData.ok) {
    return <DataTableError errorMessage={brandsData.error.message} />;
  }

  const data = brandsData.data;

  const brands: IBrand[] = data.payload;
  const meta = data.meta;

  return (
    <BrandTable
      columns={columns}
      data={brands}
      totalItems={meta.total}
      pageCount={meta.totalPages}
    />
  );
}
