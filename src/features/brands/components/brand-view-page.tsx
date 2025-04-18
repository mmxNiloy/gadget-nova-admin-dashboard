import { notFound } from 'next/navigation';
import BrandForm from './brand-form';
import getBrand from '@/app/(server)/actions/brand/get-brand.controller';
import {
  IBrandResponse,
  ICategoryListResponse
} from 'types/schema/product.shema';

interface IBrandViewPageProps {
  brandId: string;
  categories?: ICategoryListResponse;
  subCategories?: ICategoryListResponse;
}

export default async function BrandViewPage({
  brandId,
  categories,
  subCategories
}: IBrandViewPageProps) {
  let brand: IBrandResponse | undefined;
  let pageTitle = 'Create New Brand Entry';

  if (brandId !== 'new') {
    const data = await getBrand(brandId);
    // product = data.product as Product;
    if (!data.ok) {
      console.error('[BrandViewPage] Failed to get brand >', data.error);
      notFound();
    }

    pageTitle = `Edit Brand`;
    brand = data.data;
  }

  return (
    <BrandForm
      initialData={brand?.payload}
      pageTitle={pageTitle}
      categories={categories?.payload ?? []}
      subCategories={subCategories?.payload ?? []}
    />
  );
}
