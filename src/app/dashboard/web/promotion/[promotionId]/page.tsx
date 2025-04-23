import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import { SiteConfig } from '@/constants/site-config';
import PromotionViewPage from '@/features/web/promotion/components/promotion-view-page';

export const metadata = {
  title: SiteConfig.siteTitle.promotion.view
};

type PageProps = {
  params: Promise<{ promotionId: string }>;
};

export default async function Page(props: PageProps) {
  const params = await props.params;

  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <PromotionViewPage promotionId={params.promotionId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
