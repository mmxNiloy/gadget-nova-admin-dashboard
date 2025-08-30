import { notFound } from 'next/navigation';
import getCoupon from '@/app/(server)/actions/coupon/get-coupon.controller';
import CouponForm from './coupon-form';
import { ICouponResponse } from 'types/schema/coupon.schema';

interface IProductViewPageProps {
  couponId: string;
}

export default async function CouponViewPage({
  couponId
}: IProductViewPageProps) {
  let coupon: ICouponResponse | undefined;
  let pageTitle = 'Create New Coupon';

  if (couponId !== 'new') {
    const data = await getCoupon(couponId);
    // product = data.product as Product;
    if (!data.ok) {
      console.error('[CategoryViewPage] Failed to get category >', data.error);
      notFound();
    }

    pageTitle = `Edit Category`;
    coupon = data.data;
  }

  return <CouponForm initialData={coupon?.payload} pageTitle={pageTitle} />;
}
