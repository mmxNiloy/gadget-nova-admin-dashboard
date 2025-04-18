import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as CategoryTable } from '@/components/ui/table/data-table';
import { ICategory } from 'types/schema/product.shema';
import { columns } from './sub-category-tables/columns';
import getCategories from '@/app/(server)/actions/category/get-categories.controller';
import { DataTableError } from '@/components/ui/table/data-table-error';

export default async function SubcategoryListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search })
  };

  // TODO: Add filters here
  const subcategoryData = await getCategories({ getSubcategories: true });

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
