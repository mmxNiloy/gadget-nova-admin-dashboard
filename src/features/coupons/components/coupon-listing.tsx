import { DataTable as CouponTable } from '@/components/ui/table/data-table';
import { DataTableError } from '@/components/ui/table/data-table-error';
import getCoupons from '@/app/(server)/actions/coupon/get-coupons.controller';
import { ICoupon } from 'types/schema/coupon.schema';
import { columns } from './coupon-tables/columns';

export default async function CouponsListingPage() {
  const couponsData = await getCoupons();

  if (!couponsData.ok) {
    return <DataTableError errorMessage={couponsData.error.message} />;
  }

  const data = couponsData.data;

  const coupons: ICoupon[] = data.payload;

  console.log('Coupon', coupons.at(0));
  return (
    <CouponTable
      columns={columns}
      data={coupons}
      totalItems={coupons.length}
      pageCount={1}
    />
  );
}
