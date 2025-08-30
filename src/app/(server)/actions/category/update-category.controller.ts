'use server';

import requestAPI from '../request-api.controller';

interface IUpdateCategoryActionProps {
  data: {
    name: string;
    slug: string;
    isFeatured: boolean;
    metaTitle?: string;
    metaDescription?: string;
    parent_category_id?: string;
  };
  method: 'POST' | 'PATCH';
  id?: string;
}

export default async function updateCategory({
  data,
  method,
  id
}: IUpdateCategoryActionProps) {
  return await requestAPI({
    method,
    endpoint: ['category', method === 'POST' ? '' : (id ?? '')]
      .filter((str) => str.length > 0)
      .join('/'),
    authenticate: true,
    body: JSON.stringify(data)
  });
}
