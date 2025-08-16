import {
  createSearchParamsCache,
  createSerializer,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum
} from 'nuqs/server';
import { EPaginationOrderString } from 'types/enum/pagination.enum';

export const searchParams = {
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  q: parseAsString,
  sort: parseAsString,
  tags: parseAsString,
  order: parseAsStringEnum<EPaginationOrderString>(
    Object.values(EPaginationOrderString)
  ).withDefault(EPaginationOrderString.DESC),
  title: parseAsString,
  name: parseAsString,
  email: parseAsString,
  phone: parseAsString,
  orderId: parseAsString,
  productCode: parseAsString,
  categories: parseAsString,
  brands: parseAsString,
  status: parseAsString,
  isFeatured: parseAsBoolean
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams);
