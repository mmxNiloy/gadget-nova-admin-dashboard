import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import getBrands from '@/app/(server)/actions/brand/get-brands.controller';
import getCategories from '@/app/(server)/actions/category/get-categories.controller';
import BrandViewPage from '@/features/brands/components/brand-view-page';
import { SiteConfig } from '@/constants/site-config';

export const metadata = {
  title: SiteConfig.siteTitle.brand.view
};

type PageProps = {
  params: Promise<{ brandId: string }>;
  searchParams: Promise<{ preview: string }>;
};

export default async function Page(props: PageProps) {
  const params = await props.params;
  const sParams = await props.searchParams;

  // Get all brands and categories
  const [brands, categories, subCategories] = await Promise.all([
    getBrands(),
    getCategories(),
    getCategories({ getSubcategories: true })
  ]);

  if (!brands.ok) {
    console.error(
      '[Brand by ID Page] > Failed to get the list of brands >',
      brands.error
    );
  }

  if (!categories.ok) {
    console.error(
      '[Brand by ID Page] > Failed to get the list of categories >',
      categories.error
    );
  }

  if (!subCategories.ok) {
    console.error(
      '[Brand by ID Page] > Failed to get the list of subcategories >',
      subCategories.error
    );
  }

  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <BrandViewPage
            categories={categories.ok ? categories.data : undefined}
            subCategories={subCategories.ok ? subCategories.data : undefined}
            brandId={params.brandId}
          />
        </Suspense>
      </div>
    </PageContainer>
  );
}
