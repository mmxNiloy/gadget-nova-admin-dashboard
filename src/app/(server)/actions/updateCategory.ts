'use server';

import requestAPI from './request-api.action';

interface IUpdateBrandActionProps {
  data: {
    name: string;
    slug: string;
    metaTitle?: string;
    metaDescription?: string;
  };
  method: 'POST' | 'PATCH';
  id?: string;
  asSubcategory?: boolean;
}

export default async function updateCategory({
  data,
  method,
  id,
  asSubcategory
}: IUpdateBrandActionProps) {
  return await requestAPI({
    method,
    endpoint: [
      'category',
      asSubcategory ? 'subcategories' : '',
      method === 'POST' ? '' : (id ?? '')
    ]
      .filter((str) => str.length > 0)
      .join('/'),
    authenticate: true,
    body: JSON.stringify(data)
  });
}
