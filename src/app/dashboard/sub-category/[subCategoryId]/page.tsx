import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import { SiteConfig } from '@/constants/site-config';
import SubcategoryViewPage from '@/features/sub-category/components/sub-category-view-page';

export const metadata = {
  title: SiteConfig.siteTitle.category.view
};

type PageProps = {
  params: Promise<{ subCategoryId: string }>;
  searchParams: Promise<{ preview: string }>;
};

export default async function Page(props: PageProps) {
  const params = await props.params;

  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <SubcategoryViewPage subCategoryId={params.subCategoryId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
