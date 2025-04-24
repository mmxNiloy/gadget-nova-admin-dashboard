import { notFound } from 'next/navigation';
import PromotionalDiscountForm from './promotional-discount-form';
import getPromotionalDiscount from '@/app/(server)/actions/promotional-discount/get-promotional-discount.controller';
import { IPromotionalDiscountResponse } from 'types/schema/product.shema';

interface IPromotionViewPageProps {
  id: string;
}

export default async function PromotionalDiscountViewPage({
  id
}: IPromotionViewPageProps) {
  let promotion: IPromotionalDiscountResponse | undefined;
  let pageTitle = 'Create New Promotional Discount';

  if (id !== 'new') {
    const data = await getPromotionalDiscount(id);
    // product = data.product as Product;
    if (!data.ok) {
      console.error(
        '[PromotionalDiscountViewPage] Failed to get promotional discount >',
        data.error
      );
      notFound();
    }

    pageTitle = `Edit Promotional Discount`;
    promotion = data.data;
  }

  return (
    <PromotionalDiscountForm
      initialData={promotion?.payload}
      pageTitle={pageTitle}
    />
  );
}
