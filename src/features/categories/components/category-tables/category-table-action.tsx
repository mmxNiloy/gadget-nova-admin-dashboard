'use client';

import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { ICategory } from 'types/schema/product.shema';
import { keyToLabel } from '@/lib/utils';
import { EPaginationOrderString } from 'types/enum/pagination.enum';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import Icons from '@/components/ui/icons';
import { useCategoryTableFilters } from './use-category-table-filters';
import { useMemo } from 'react';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableFilterSelect } from '@/components/ui/table/data-table-filter-select';
import { Label } from '@/components/ui/label';
import { PopoverClose } from '@/components/NextTiptap/TiptapEditor/components/ui/Popover';

export default function CategoryTableAction() {
  const {
    setPage,
    sortQuery,
    setSortQuery,
    orderQuery,
    setOrderQuery,
    nameQuery,
    setNameQuery,
    isFeaturedQuery,
    setIsFeaturedQuery,
    resetFilters,
    isAnyFilterActive
  } = useCategoryTableFilters();

  const sentinelCategory = useMemo(
    (): ICategory => ({
      id: '',
      is_active: 0,
      isFeatured: false,
      created_by: undefined,
      created_user_name: '',
      updated_by: undefined,
      updated_user_name: '',
      created_at: '',
      updated_at: '',
      name: '',
      slug: '',
      metaTitle: '',
      metaDescription: ''
    }),
    []
  );

  return (
    <div className='flex flex-col items-center justify-between gap-2 sm:flex-row'>
      <DataTableSearch
        searchKey='name'
        searchQuery={nameQuery}
        setSearchQuery={setNameQuery}
        setPage={setPage}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button className='group w-full gap-1 self-end sm:w-fit md:max-w-72'>
            <div className='relative'>
              <Icons.filter className='absolute size-4 rotate-0 opacity-100 transition-all group-data-[state=open]:rotate-180 group-data-[state=open]:opacity-0' />
              <Icons.close className='size-4 rotate-180 opacity-0 transition-all group-data-[state=open]:rotate-0 group-data-[state=open]:opacity-100' />
            </div>
            Filter
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align='end'
          className='w-full max-w-screen-sm md:max-w-72'
        >
          <div className='flex flex-col gap-4'>
            <DataTableFilterBox
              filterKey='sort'
              title='Sort'
              options={Object.keys(sentinelCategory).map((sortKey) => ({
                value: sortKey,
                label: keyToLabel(sortKey)
              }))}
              setFilterValue={setSortQuery}
              filterValue={sortQuery}
            />

            <div className='flex flex-col gap-2'>
              <Label>Order</Label>
              <DataTableFilterSelect
                key={orderQuery}
                filterKey='order'
                title='Order'
                options={[
                  {
                    value: EPaginationOrderString.DESC,
                    label: 'DESC'
                  },
                  {
                    value: EPaginationOrderString.ASC,
                    label: 'ASC'
                  }
                ]}
                setFilterValue={(val) =>
                  setOrderQuery(val as EPaginationOrderString)
                }
                filterValue={orderQuery}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <Label>Filter Featured</Label>
              <DataTableFilterSelect
                key={isFeaturedQuery ? 'true' : 'false'}
                filterKey='isFeatured'
                title='Filter featured'
                options={[
                  {
                    value: 'true',
                    label: 'Yes'
                  },
                  {
                    value: 'false',
                    label: 'No'
                  }
                ]}
                setFilterValue={(val) => setIsFeaturedQuery(val === 'true')}
                filterValue={isFeaturedQuery ? 'true' : 'false'}
              />
            </div>
            <PopoverClose asChild>
              <DataTableResetFilter
                isFilterActive={isAnyFilterActive}
                onReset={resetFilters}
              />
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
