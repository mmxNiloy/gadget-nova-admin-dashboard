'use client';

import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { ICategory } from 'types/schema/product.shema';
import { DataTableFilterSelect } from '@/components/ui/table/data-table-filter-select';
import { EPaginationOrderString } from 'types/enum/pagination.enum';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import Icons from '@/components/ui/icons';
import { Label } from '@/components/ui/label';
import { useBrandTableFilters } from './use-brand-table-filters';

interface IProductTableActionProps {
  categories: ICategory[];
  subcategories: ICategory[];
}

export default function BrandTableAction({
  categories,
  subcategories
}: IProductTableActionProps) {
  const {
    setPage,
    sortQuery,
    setSortQuery,
    orderQuery,
    setOrderQuery,
    categoriesFilter,
    setCategoriesFilter,
    isAnyFilterActive,
    resetFilters,
    nameQuery,
    setNameQuery
  } = useBrandTableFilters();

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
              filterKey='categories'
              title='Subcategories'
              options={subcategories.map((cat) => ({
                value: cat.id,
                label: cat.name
              }))}
              setFilterValue={setCategoriesFilter}
              filterValue={categoriesFilter}
            />

            <DataTableFilterBox
              filterKey='sort'
              title='Sort'
              options={[
                { label: 'Name', value: 'name' },
                { label: 'Created At', value: 'created_at' },
                { label: 'Updated At', value: 'updated_at' }
              ]}
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
                    label: 'Descending'
                  },
                  {
                    value: EPaginationOrderString.ASC,
                    label: 'Ascending'
                  }
                ]}
                setFilterValue={(val) =>
                  setOrderQuery(val as EPaginationOrderString)
                }
                filterValue={orderQuery}
              />
            </div>
            <DataTableResetFilter
              isFilterActive={isAnyFilterActive}
              onReset={resetFilters}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
