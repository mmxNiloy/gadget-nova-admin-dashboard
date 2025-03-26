import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import { SiteConfig } from '@/constants/site-config';
import OrderViewPage from '@/features/orders/components/order-view-page';

export const metadata = {
  title: SiteConfig.siteTitle.order.view
};

type PageProps = {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ preview: string }>;
};

export default async function Page(props: PageProps) {
  const params = await props.params;
  const sParams = await props.searchParams;

  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <OrderViewPage orderId={params.orderId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
