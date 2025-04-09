'use server';

import requestAPI from './request-api.action';

interface IUpdateBrandActionProps {
  data: {
    name: string;
    slug: string;
    metaTitle?: string;
    metaDescription?: string;
    category_ids?: string[];
    category_id?: string | null;
  };
  method: 'POST' | 'PATCH';
  id?: string;
}

export default async function updateBrand({
  data,
  method,
  id
}: IUpdateBrandActionProps) {
  const mData = {
    ...data,
    category_ids: [...(data.category_ids ?? []), data.category_id].filter(
      (item) => Boolean(item)
    )
  };

  return await requestAPI({
    method,
    endpoint: ['brand', method === 'POST' ? '' : id].join('/'),
    authenticate: true,
    body: JSON.stringify(mData)
  });
}
