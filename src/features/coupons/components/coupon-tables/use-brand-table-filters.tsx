'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';
import { EPaginationOrderString } from 'types/enum/pagination.enum';

export function useBrandTableFilters() {
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

  const [categoriesFilter, setCategoriesFilter] = useQueryState(
    'categories',
    searchParams.categories.withOptions({ shallow: false }).withDefault('')
  );

  const [brandsFilter, setBrandsFilter] = useQueryState(
    'brands',
    searchParams.categories.withOptions({ shallow: false }).withDefault('')
  );

  const resetFilters = useCallback(() => {
    setSortQuery(null);
    setOrderQuery(null);
    setNameQuery(null);
    setCategoriesFilter(null);
    setBrandsFilter(null);

    setPage(1);
  }, [
    setSortQuery,
    setOrderQuery,
    setCategoriesFilter,
    setBrandsFilter,
    setPage,
    setNameQuery
  ]);

  const isAnyFilterActive = useMemo(() => {
    return (
      !!nameQuery ||
      !!categoriesFilter ||
      !!sortQuery ||
      !!orderQuery ||
      !!brandsFilter
    );
  }, [nameQuery, categoriesFilter, sortQuery, orderQuery, brandsFilter]);

  return {
    page,
    setPage,
    orderQuery,
    setOrderQuery,
    sortQuery,
    setSortQuery,
    nameQuery,
    setNameQuery,
    resetFilters,
    isAnyFilterActive,
    categoriesFilter,
    setCategoriesFilter,
    brandsFilter,
    setBrandsFilter
  };
}
