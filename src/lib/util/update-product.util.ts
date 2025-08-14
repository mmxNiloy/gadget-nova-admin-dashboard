import ActionResponseBuilder from 'types/ActionResponseBuilder';
import { IErrorResponseBase } from 'types/schema/base.schema';
import { IProductResponse } from 'types/schema/product.shema';

interface IUpdateProductActionProps {
  data: FormData;
  method: 'POST' | 'PATCH';
  id?: string;
}

export default async function updateProduct({
  data,
  method,
  id
}: IUpdateProductActionProps) {
  try {
    if (id && id.length > 0) {
      data.append('product_id', id); // Conditionally add the id
    }
    const result = await fetch('/api/product', {
      method,
      body: data
    });

    if (result.ok) {
      const res = await result.json();
      return res as { ok: true; data: IProductResponse };
    } else {
      const res = await result.json();
      return res as { ok: false; error: IErrorResponseBase };
    }
  } catch (error) {
    return {
      ok: false,
      error: ActionResponseBuilder.error({
        statusCode: 500,
        message: 'Failed to update product.',
        error: true,
        path: '',
        timestamp: ''
      }).toJSON() as unknown as IErrorResponseBase
    };
  }
}
