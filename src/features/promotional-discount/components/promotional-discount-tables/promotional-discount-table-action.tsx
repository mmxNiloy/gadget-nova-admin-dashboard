'use client';

import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { IPromotionalDiscount } from 'types/schema/product.shema';
import { keyToLabel } from '@/lib/utils';
import { EPaginationOrderString } from 'types/enum/pagination.enum';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import Icons from '@/components/ui/icons';
import { usePromotionalDiscountTableFilters } from './use-promotional-discount-table-filters';
import { useMemo } from 'react';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableFilterSelect } from '@/components/ui/table/data-table-filter-select';
import { Label } from '@/components/ui/label';
import { PopoverClose } from '@/components/NextTiptap/TiptapEditor/components/ui/Popover';

export default function PromotionalDiscountTableAction() {
  const {
    setPage,
    sortQuery,
    setSortQuery,
    orderQuery,
    setOrderQuery,
    titleQuery,
    setTitleQuery,
    resetFilters,
    isAnyFilterActive
  } = usePromotionalDiscountTableFilters();

  const sentinelPromoDisc = useMemo(
    (): IPromotionalDiscount => ({
      id: '',
      is_active: 0,
      is_percentage: 0,
      amount: 0,
      startDate: '',
      endDate: '',
      product_id: ''
    }),
    []
  );

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
        <div className='flex flex-col gap-4'>
          <DataTableSearch
            searchKey='product'
            searchQuery={titleQuery}
            setSearchQuery={setTitleQuery}
            setPage={setPage}
          />

          <DataTableFilterBox
            filterKey='sort'
            title='Sort'
            options={Object.keys(sentinelPromoDisc).map((sortKey) => ({
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

          <PopoverClose asChild>
            <DataTableResetFilter
              isFilterActive={isAnyFilterActive}
              onReset={resetFilters}
            />
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
