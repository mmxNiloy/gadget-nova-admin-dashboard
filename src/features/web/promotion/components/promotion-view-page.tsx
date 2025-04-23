import { notFound } from 'next/navigation';
import PromotionForm from './promotion-form';
import getPromotion from '@/app/(server)/actions/web/promotion/get-promotion.controller';
import { IPromotionResponse } from 'types/schema/promotion.schema';

interface IPromotionViewPageProps {
  promotionId: string;
}

export default async function PromotionViewPage({
  promotionId
}: IPromotionViewPageProps) {
  let promotion: IPromotionResponse | undefined;
  let pageTitle = 'Create New Promotion';

  if (promotionId !== 'new') {
    const data = await getPromotion(promotionId);
    // product = data.product as Product;
    if (!data.ok) {
      console.error(
        '[PromotionViewPage] Failed to get promotion >',
        data.error
      );
      notFound();
    }

    pageTitle = `Edit Promotion`;
    promotion = data.data;
  }

  return (
    <PromotionForm initialData={promotion?.payload} pageTitle={pageTitle} />
  );
}
