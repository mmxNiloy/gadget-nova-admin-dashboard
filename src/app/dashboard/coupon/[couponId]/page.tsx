import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import { SiteConfig } from '@/constants/site-config';
import CouponViewPage from '@/features/coupons/components/coupon-view-page';
import getCategories from '@/app/(server)/actions/category/get-categories.controller';
import getBrands from '@/app/(server)/actions/brand/get-brands.controller';
import { DataTableError } from '@/components/ui/table/data-table-error';

export const metadata = {
  title: SiteConfig.siteTitle.coupon.view
};

type PageProps = {
  params: Promise<{ couponId: string }>;
};

export default async function CouponEditPage(props: PageProps) {
  const params = await props.params;

  const [categoryData, subCategoryData, brandData] = await Promise.all([
    getCategories(),
    getCategories({ getSubcategories: true }),
    getBrands()
  ]);

  if (!categoryData.ok || !subCategoryData.ok || !brandData.ok) {
    return (
      <PageContainer scrollable>
        <div className='flex-1 space-y-4'>
          <DataTableError errorMessage={'Failed to load data'} />
        </div>
      </PageContainer>
    );
  }

  const categories = categoryData.data.payload;
  const subcategories = subCategoryData.data.payload;
  const brands = brandData.data.payload;

  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <CouponViewPage
            couponId={params.couponId}
            categories={categories}
            subcategories={subcategories}
            brands={brands}
          />
        </Suspense>
      </div>
    </PageContainer>
  );
}
