'use server';

import requestAPI from '../request-api.controller';

interface IUpdateBrandActionProps {
  data: {
    name: string;
    slug: string;
    metaTitle?: string;
    metaDescription?: string;
    category_ids?: string[];
    main_categories: string[];
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
    category_ids: [
      ...(data.category_ids ?? []),
      ...data.main_categories
    ].filter((item) => Boolean(item))
  };

  return await requestAPI({
    method,
    endpoint: ['brand', method === 'POST' ? '' : id].join('/'),
    authenticate: true,
    body: JSON.stringify(mData)
  });
}
