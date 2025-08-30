import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as CategoryTable } from '@/components/ui/table/data-table';
import { columns } from './district-tables/columns';
import { DataTableError } from '@/components/ui/table/data-table-error';
import getAllDistricts from '@/app/(server)/actions/order/district/get-all-districts.controller';
import { IDistrict } from 'types/schema/order.schema';

export default async function DistrictListingPage() {
  const name = searchParamsCache.get('name') ?? '';

  const distData = await getAllDistricts(name);

  if (!distData.ok) {
    return <DataTableError errorMessage={distData.error.message} />;
  }

  const data = distData.data;

  const districts: IDistrict[] = data.payload;

  return (
    <CategoryTable
      columns={columns}
      data={districts}
      pageCount={1}
      totalItems={districts.length}
    />
  );
}
