import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as CategoryTable } from '@/components/ui/table/data-table';
import { ICategory } from 'types/schema/product.shema';
import { columns } from './category-tables/columns';
import getPaginatedCategories from '@/app/(server)/actions/category/get-paginated-category.controller';
import { ICategoryPaginationProps } from 'types/schema/pagination.schema';
import getCategories from '@/app/(server)/actions/category/get-categories.controller';
import { DataTableError } from '@/components/ui/table/data-table-error';
import { EPaginationOrderString } from 'types/enum/pagination.enum';

export default async function CategoryListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const name = searchParamsCache.get('name') ?? '';
  const sort = searchParamsCache.get('sort') as keyof ICategory;
  const order = searchParamsCache.get('order') ?? EPaginationOrderString.DESC;
  const pageLimit = searchParamsCache.get('limit');

  const filters: ICategoryPaginationProps = {
    page,
    limit: pageLimit,
    name,
    sort,
    order
  };

  // TODO: Get paginated categories here
  const categoryData = await getCategories();

  if (!categoryData.ok) {
    return <DataTableError errorMessage={categoryData.error.message} />;
  }

  const data = categoryData.data;

  const categories: ICategory[] = data.payload;
  const meta = data.meta ?? {
    totalPages: 1,
    total: categories.length
  };

  return (
    <CategoryTable
      columns={columns}
      data={categories}
      pageCount={meta.totalPages}
      totalItems={meta.total}
    />
  );
}
