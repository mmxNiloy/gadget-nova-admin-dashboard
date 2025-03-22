'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';
import { EPaginationOrder } from 'types/enum/pagination.enum';

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
  const [orderQuery, setOrderQuery] = useQueryState(
    'order',
    searchParams.order
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault(`${EPaginationOrder.DESC}`)
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

    setPage(1);
  }, [
    setSortQuery,
    setOrderQuery,
    setTitleQuery,
    setProductCodeQuery,
    setCategoriesFilter,
    setBrandsFilter,
    setPage
  ]);

  const isAnyFilterActive = useMemo(() => {
    return !!titleQuery || !!categoriesFilter;
  }, [titleQuery, categoriesFilter]);

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
    setBrandsFilter
  };
}
