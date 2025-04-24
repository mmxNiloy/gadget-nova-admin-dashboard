'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';
import { EPaginationOrderString } from 'types/enum/pagination.enum';

export const CATEGORY_OPTIONS = [
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Clothing', label: 'Clothing' },
  { value: 'Toys', label: 'Toys' },
  { value: 'Groceries', label: 'Groceries' },
  { value: 'Books', label: 'Books' },
  { value: 'Jewelry', label: 'Jewelry' },
  { value: 'Beauty Products', label: 'Beauty Products' }
];
export function useCategoryTableFilters() {
  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const [sortQuery, setSortQuery] = useQueryState(
    'sort',
    searchParams.sort
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );
  const [orderQuery, setOrderQuery] = useQueryState(
    'order',
    searchParams.order
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault(EPaginationOrderString.DESC)
  );
  const [nameQuery, setNameQuery] = useQueryState(
    'name',
    searchParams.name
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [isFeaturedQuery, setIsFeaturedQuery] = useQueryState(
    'isFeatured',
    searchParams.isFeatured
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault(false)
  );

  const resetFilters = useCallback(() => {
    setSortQuery(null);
    setOrderQuery(null);
    setNameQuery(null);
    setIsFeaturedQuery(null);

    setPage(1);
  }, [setSortQuery, setOrderQuery, setNameQuery, setIsFeaturedQuery, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!nameQuery || !!isFeaturedQuery || !!sortQuery || !!orderQuery;
  }, [isFeaturedQuery, nameQuery, orderQuery, sortQuery]);

  return {
    page,
    setPage,
    orderQuery,
    setOrderQuery,
    sortQuery,
    setSortQuery,
    nameQuery,
    setNameQuery,
    isFeaturedQuery,
    setIsFeaturedQuery,
    resetFilters,
    isAnyFilterActive
  };
}
