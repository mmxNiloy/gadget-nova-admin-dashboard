'use client';

import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import {
  CATEGORY_OPTIONS,
  useProductTableFilters
} from './use-product-table-filters';
import {
  AProductKeys,
  IBrand,
  ICategory,
  IProduct
} from 'types/schema/product.shema';
import { keyToLabel } from '@/lib/utils';
import { DataTableFilterSelect } from '@/components/ui/table/data-table-filter-select';
import { EPaginationOrder } from 'types/enum/pagination.enum';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import Icons from '@/components/ui/icons';

interface IProductTableActionProps {
  categories: ICategory[];
  brands: IBrand[];
}

export default function ProductTableAction({
  categories,
  brands
}: IProductTableActionProps) {
  const {
    setPage,
    sortQuery,
    setSortQuery,
    orderQuery,
    setOrderQuery,
    categoriesFilter,
    setCategoriesFilter,
    brandsFilter,
    setBrandsFilter,
    isAnyFilterActive,
    resetFilters,
    titleQuery,
    setTitleQuery,
    productCodeQuery,
    setProductCodeQuery
  } = useProductTableFilters();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='group w-full gap-1 self-end md:max-w-72'>
          <div className='relative'>
            <Icons.filter className='absolute size-4 rotate-0 opacity-100 transition-all group-data-[state=open]:rotate-180 group-data-[state=open]:opacity-0' />
            <Icons.close className='size-4 rotate-180 opacity-0 transition-all group-data-[state=open]:rotate-0 group-data-[state=open]:opacity-100' />
          </div>
          Filter
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align='start'
        className='w-full max-w-screen-sm md:max-w-72'
      >
        <div className='flex flex-wrap items-center gap-4'>
          <DataTableSearch
            searchKey='title'
            searchQuery={titleQuery}
            setSearchQuery={setTitleQuery}
            setPage={setPage}
          />
          <DataTableSearch
            searchKey='product code'
            searchQuery={productCodeQuery}
            setSearchQuery={setProductCodeQuery}
            setPage={setPage}
          />
          <DataTableFilterBox
            filterKey='categories'
            title='Categories'
            options={categories.map((cat) => ({
              value: cat.id,
              label: cat.name
            }))}
            setFilterValue={setCategoriesFilter}
            filterValue={categoriesFilter}
          />
          <DataTableFilterBox
            filterKey='brands'
            title='Brands'
            options={brands.map((br) => ({ value: br.id, label: br.name }))}
            setFilterValue={setBrandsFilter}
            filterValue={brandsFilter}
          />
          <DataTableFilterBox
            filterKey='sort'
            title='Sort'
            options={AProductKeys.map((item) => ({
              value: item,
              label: keyToLabel(item)
            }))}
            setFilterValue={setSortQuery}
            filterValue={sortQuery}
          />

          <DataTableFilterSelect
            filterKey='order'
            title='Order'
            options={[
              {
                value: `${EPaginationOrder.DESC}`,
                label: 'Descending'
              },
              {
                value: `${EPaginationOrder.ASC}`,
                label: 'Ascending'
              }
            ]}
            setFilterValue={setOrderQuery}
            filterValue={orderQuery}
          />
          <DataTableResetFilter
            isFilterActive={isAnyFilterActive}
            onReset={resetFilters}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
