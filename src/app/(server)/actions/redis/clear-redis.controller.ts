'use server';

import requestAPI from '../request-api.controller';

export default async function clearRedis() {
  return await requestAPI({
    endpoint: ['admin', 'redis', 'flush'].join('/'),
    method: 'POST',
    authenticate: true
  });
}
