'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';
import { EPaginationOrderString } from 'types/enum/pagination.enum';

export function useOrderTableFilters() {
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

  const [statusQuery, setStatusQuery] = useQueryState(
    'status',
    searchParams.status
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const resetFilters = useCallback(() => {
    setSortQuery(null);
    setOrderQuery(null);
    setNameQuery(null);
    setStatusQuery(null);
    
    setPage(1);
  }, [
    setSortQuery,
    setOrderQuery,
    setNameQuery,
    setStatusQuery,
    setPage
  ]);

  const isAnyFilterActive = useMemo(() => {
    return (
      !!nameQuery ||
      !!sortQuery ||
      !!orderQuery ||
      !!statusQuery
    );
  }, [
    nameQuery,
    sortQuery,
    orderQuery,
    statusQuery
  ]);

  return {
    page,
    setPage,
    orderQuery,
    setOrderQuery,
    sortQuery,
    setSortQuery,
    nameQuery,
    setNameQuery,
    statusQuery,
    setStatusQuery,
    resetFilters,
    isAnyFilterActive,
  };
}
