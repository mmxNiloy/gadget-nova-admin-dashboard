'use server';

import requestAPI from '../request-api.controller';

interface IUpdateBrandActionProps {
  data: {
    name: string;
    slug: string;
    isFeatured: boolean;
    metaTitle?: string;
    metaDescription?: string;
  };
  method: 'POST' | 'PATCH';
  id?: string;
}

export default async function updateCategory({
  data,
  method,
  id
}: IUpdateBrandActionProps) {
  return await requestAPI({
    method,
    endpoint: ['category', method === 'POST' ? '' : (id ?? '')]
      .filter((str) => str.length > 0)
      .join('/'),
    authenticate: true,
    body: JSON.stringify(data)
  });
}
