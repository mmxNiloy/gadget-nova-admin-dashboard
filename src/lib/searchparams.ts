import {
  createSearchParamsCache,
  createSerializer,
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
  order: parseAsStringEnum<EPaginationOrderString>(
    Object.values(EPaginationOrderString)
  ).withDefault(EPaginationOrderString.DESC),
  title: parseAsString,
  name: parseAsString,
  productCode: parseAsString,
  categories: parseAsString,
  brands: parseAsString,
  status: parseAsString
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams);
