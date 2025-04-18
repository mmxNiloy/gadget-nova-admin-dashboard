import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';
import { IProduct } from 'types/schema/product.shema';
import getPaginatedProducts from '@/app/(server)/actions/product/get-paginated-product.controller';
import { IProductPaginationProps } from 'types/schema/pagination.schema';
import { EPaginationOrderString } from 'types/enum/pagination.enum';
import { DataTableError } from '@/components/ui/table/data-table-error';

type ProductListingPage = {};

export default async function ProductListingPage({}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const pageLimit = searchParamsCache.get('limit');
  const sort = searchParamsCache.get('sort') as keyof IProduct;
  const order = searchParamsCache.get('order') ?? EPaginationOrderString.DESC;
  const title = searchParamsCache.get('title') ?? '';
  const productCode = searchParamsCache.get('productCode') ?? '';
  const categories = searchParamsCache.get('categories') ?? '';
  const brands = searchParamsCache.get('brands') ?? '';

  const filters: IProductPaginationProps = {
    page,
    limit: pageLimit,
    sort,
    order,
    title,
    productCode,
    categories,
    brands
  };

  const prodData = await getPaginatedProducts({ ...filters });

  if (!prodData.ok) {
    return <DataTableError errorMessage={prodData.error.message} />;
  }

  const data = prodData.data;

  const products: IProduct[] = data.payload;

  return (
    <ProductTable
      columns={columns}
      data={products}
      pageCount={prodData.data.meta.totalPages}
      totalItems={prodData.data.meta.total}
    />
  );
}
