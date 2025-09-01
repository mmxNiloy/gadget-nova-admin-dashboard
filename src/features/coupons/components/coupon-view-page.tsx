import { notFound } from 'next/navigation';
import getCoupon from '@/app/(server)/actions/coupon/get-coupon.controller';
import CouponForm from './coupon-form';
import { ICouponResponse } from 'types/schema/coupon.schema';
import { IBrand, ICategory } from 'types/schema/product.shema';

interface IProductViewPageProps {
  couponId: string;
  categories: ICategory[];
  subcategories: ICategory[];
  brands: IBrand[];
}

export default async function CouponViewPage({
  couponId,
  categories,
  subcategories,
  brands
}: IProductViewPageProps) {
  let coupon: ICouponResponse | undefined;
  let pageTitle = 'Create New Coupon';

  if (couponId !== 'new') {
    const data = await getCoupon(couponId);
    // product = data.product as Product;
    if (!data.ok) {
      console.error('[CouponViewPage] Failed to get coupon >', data.error);
      notFound();
    }

    pageTitle = `Edit Coupon`;
    coupon = data.data;
  }

  return (
    <CouponForm
      initialData={coupon?.payload}
      pageTitle={pageTitle}
      categories={categories}
      subcategories={subcategories}
      brands={brands}
    />
  );
}
