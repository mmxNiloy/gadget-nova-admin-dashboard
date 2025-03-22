import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString
} from 'nuqs/server';
import { EPaginationOrder } from 'types/enum/pagination.enum';

export const searchParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  q: parseAsString,
  sort: parseAsString,
  order: parseAsString.withDefault(`${EPaginationOrder.DESC}`),
  title: parseAsString,
  productCode: parseAsString,
  categories: parseAsString,
  brands: parseAsString
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams);
