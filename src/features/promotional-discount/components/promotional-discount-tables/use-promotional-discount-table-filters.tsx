'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';
import { EPaginationOrderString } from 'types/enum/pagination.enum';

export function usePromotionalDiscountTableFilters() {
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
  const [titleQuery, setTitleQuery] = useQueryState(
    'title',
    searchParams.title
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const resetFilters = useCallback(() => {
    setSortQuery(null);
    setOrderQuery(null);
    setTitleQuery(null);

    setPage(1);
  }, [setSortQuery, setOrderQuery, setTitleQuery, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!titleQuery || !!sortQuery || !!orderQuery;
  }, [titleQuery, orderQuery, sortQuery]);

  return {
    page,
    setPage,
    orderQuery,
    setOrderQuery,
    sortQuery,
    setSortQuery,
    titleQuery,
    setTitleQuery,
    resetFilters,
    isAnyFilterActive
  };
}
