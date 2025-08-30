import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import CategoryViewPage from '@/features/categories/components/category-view-page';
import { SiteConfig } from '@/constants/site-config';
import CouponViewPage from '@/features/coupons/components/coupon-view-page';

export const metadata = {
  title: SiteConfig.siteTitle.coupon.view
};

type PageProps = {
  params: Promise<{ couponId: string }>;
};

export default async function CouponEditPage(props: PageProps) {
  const params = await props.params;

  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <CouponViewPage couponId={params.couponId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
