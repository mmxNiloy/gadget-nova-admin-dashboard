import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import { SiteConfig } from '@/constants/site-config';
import PromotionalDiscountViewPage from '@/features/promotional-discount/components/promotional-discount-view-page';

export const metadata = {
  title: SiteConfig.siteTitle.promotionalDiscount.view
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PromotionalDiscountByIDPage(props: PageProps) {
  const params = await props.params;

  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <PromotionalDiscountViewPage id={params.id} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
