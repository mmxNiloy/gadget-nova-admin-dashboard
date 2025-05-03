import ActionResponseBuilder from 'types/ActionResponseBuilder';
import { IErrorResponseBase } from 'types/schema/base.schema';
import { IPromotionResponse } from 'types/schema/promotion.schema';

interface IUpdatePromotionActionProps {
  data: FormData;
  method: 'POST' | 'PATCH';
  id?: string;
}

export default async function updatePromotion({
  data,
  method,
  id
}: IUpdatePromotionActionProps) {
  try {
    console.debug('Updating promotion...');
    data.append('promotion_id', id ?? '');
    console.debug('Form data:', data);
    const result = await fetch('/api/promotion', {
      method,
      body: data
    });
    console.debug('Request Made...');

    const res = await result.json();
    if (result.ok) {
      console.debug('Result OK');
      return res as { ok: true; data: IPromotionResponse };
    } else {
      console.debug('Result Not OK', res);
      return res as { ok: false; error: IErrorResponseBase };
    }
  } catch (error) {
    console.debug('Error caught...', error);
    return {
      ok: false,
      error: ActionResponseBuilder.error({
        statusCode: 500,
        message: 'Failed to update promotion.',
        error: true,
        path: '',
        timestamp: ''
      }).toJSON() as unknown as IErrorResponseBase
    };
  }
}
