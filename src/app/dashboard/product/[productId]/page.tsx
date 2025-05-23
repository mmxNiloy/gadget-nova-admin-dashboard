import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import getBrands from '@/app/(server)/actions/brand/get-brands.controller';
import getCategories from '@/app/(server)/actions/category/get-categories.controller';
import { SiteConfig } from '@/constants/site-config';
import ProductViewPage from '@/features/products/components/product-view-page';
import getProductAttributeValues from '@/app/(server)/actions/attribute/value/get-products-attribute-values.controller';

export const metadata = {
  title: SiteConfig.siteTitle.product.view
};

type PageProps = {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ preview: string }>;
};

export default async function Page(props: PageProps) {
  const params = await props.params;

  // Get all brands and categories
  const [brands, categories, subcategories, attributes] = await Promise.all([
    getBrands(),
    getCategories(),
    getCategories({ getSubcategories: true }),
    getProductAttributeValues()
  ]);

  if (!brands.ok) {
    console.error(
      '[Product by ID Page] > Failed to get the list of brands >',
      brands.error
    );
  }

  if (!categories.ok) {
    console.error(
      '[Product by ID Page] > Failed to get the list of categories >',
      categories.error
    );
  }

  if (!subcategories.ok) {
    console.error(
      '[Product by ID Page] > Failed to get the list of subcategories >',
      subcategories.error
    );
  }

  if (!attributes.ok) {
    console.error(
      '[Product by ID Page] > Failed to get the list of attributes >',
      attributes.error
    );
  }

  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <ProductViewPage
            productId={params.productId}
            brands={brands.ok ? brands.data : undefined}
            categories={categories.ok ? categories.data : undefined}
            attributes={attributes.ok ? attributes.data : undefined}
            subcategories={subcategories.ok ? subcategories.data : undefined}
          />
        </Suspense>
      </div>
    </PageContainer>
  );
}
