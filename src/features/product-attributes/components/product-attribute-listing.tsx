import { DataTable as ProductAttributeTable } from '@/components/ui/table/data-table';
import { IAttributeValue } from 'types/schema/product.shema';
import { columns } from './product-attributes-table/columns';
import getProductAttributeValues from '@/app/(server)/actions/attribute/value/get-products-attribute-values.controller';
import { DataTableError } from '@/components/ui/table/data-table-error';

type ProductAttributeListingPage = {};

export default async function ProductAttributeListingPage({}: ProductAttributeListingPage) {
  const attrData = await getProductAttributeValues();

  if (!attrData.ok) {
    return <DataTableError errorMessage={attrData.error.message} />;
  }

  const data = attrData.data;

  const attributes: IAttributeValue[] = data.payload;

  return (
    <ProductAttributeTable
      columns={columns}
      data={attributes}
      totalItems={attributes.length}
      pageCount={1}
    />
  );
}
