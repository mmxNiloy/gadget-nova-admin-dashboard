'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';
import { EPaginationOrderString } from 'types/enum/pagination.enum';

export function useProductTableFilters() {
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

  const [tagsQuery, setTagsQuery] = useQueryState(
    'tags',
    searchParams.tags
      .withOptions({
        shallow: false,
        throttleMs: 1000
      })
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

  const [productCodeQuery, setProductCodeQuery] = useQueryState(
    'productCode',
    searchParams.productCode
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
    setTitleQuery(null);
    setProductCodeQuery(null);
    setCategoriesFilter(null);
    setBrandsFilter(null);
    setTagsQuery(null);

    setPage(1);
  }, [
    setSortQuery,
    setOrderQuery,
    setTitleQuery,
    setProductCodeQuery,
    setCategoriesFilter,
    setBrandsFilter,
    setPage,
    setTagsQuery
  ]);

  const isAnyFilterActive = useMemo(() => {
    return (
      !!titleQuery ||
      !!categoriesFilter ||
      !!sortQuery ||
      !!orderQuery ||
      !!productCodeQuery ||
      !!brandsFilter ||
      !!tagsQuery
    );
  }, [
    titleQuery,
    categoriesFilter,
    sortQuery,
    orderQuery,
    productCodeQuery,
    brandsFilter,
    tagsQuery
  ]);

  return {
    page,
    setPage,
    orderQuery,
    setOrderQuery,
    sortQuery,
    setSortQuery,
    titleQuery,
    setTitleQuery,
    productCodeQuery,
    setProductCodeQuery,
    resetFilters,
    isAnyFilterActive,
    categoriesFilter,
    setCategoriesFilter,
    brandsFilter,
    setBrandsFilter,
    tagsQuery,
    setTagsQuery
  };
}
