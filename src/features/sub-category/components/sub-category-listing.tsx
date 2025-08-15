import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as CategoryTable } from '@/components/ui/table/data-table';
import { ICategory } from 'types/schema/product.shema';
import { columns } from './sub-category-tables/columns';
import { DataTableError } from '@/components/ui/table/data-table-error';
import { ICategoryPaginationProps } from 'types/schema/pagination.schema';
import { EPaginationOrderString } from 'types/enum/pagination.enum';
import getSubcategories from '@/app/(server)/actions/category/get-subcategories.controller';

export default async function SubcategoryListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const name = searchParamsCache.get('name') ?? '';
  const sort = searchParamsCache.get('sort') as keyof ICategory;
  const order = searchParamsCache.get('order') ?? EPaginationOrderString.DESC;
  const isFeatured = searchParamsCache.get('isFeatured') ?? undefined;
  const pageLimit = searchParamsCache.get('limit');

  const filters: ICategoryPaginationProps = {
    page,
    limit: pageLimit,
    name,
    sort,
    order,
    isFeatured
  };

  // TODO: Add filters here
  const subcategoryData = await getSubcategories(filters);

  if (!subcategoryData.ok) {
    return <DataTableError errorMessage={subcategoryData.error.message} />;
  }

  const data = subcategoryData.data;

  const totalCategories = Math.ceil(data.payload.length / pageLimit);
  const brands: ICategory[] = data.payload;

  return (
    <CategoryTable
      columns={columns}
      data={brands}
      totalItems={totalCategories}
    />
  );
}
