'use server';

import requestAPI from '../request-api.controller';

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
  return await requestAPI({
    method,
    endpoint: ['products', method === 'POST' ? '' : id].join('/'),
    authenticate: true,
    body: data,
    asFormData: true
  });
}
