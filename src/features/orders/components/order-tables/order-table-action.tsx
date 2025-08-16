'use client';

import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { keyToLabel } from '@/lib/utils';
import { DataTableFilterSelect } from '@/components/ui/table/data-table-filter-select';
import { EPaginationOrderString } from 'types/enum/pagination.enum';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import Icons from '@/components/ui/icons';
import { useCallback, useMemo, useState } from 'react';
import { EObjectStatus } from 'types/enum/object-status.enum';
import { Label } from '@/components/ui/label';
import { useOrderTableFilters } from './use-order-table-filters';
import { IOrder } from 'types/schema/order.schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

type SearchKey = 'name' | 'email' | 'phone' | 'orderId';

const searchKeys: SearchKey[] = ['name', 'email', 'phone', 'orderId'];

export default function OrderTableAction() {
  const {
    setPage,
    sortQuery,
    setSortQuery,
    orderQuery,
    setOrderQuery,
    nameQuery,
    setNameQuery,
    emailQuery,
    setEmailQuery,
    phoneQuery,
    setPhoneQuery,
    orderIdQuery,
    setOrderIdQuery,
    statusQuery,
    setStatusQuery,
    isAnyFilterActive,
    resetFilters
  } = useOrderTableFilters();

  const sentinelProduct = useMemo(
    (): IOrder => ({
      id: '',
      is_active: EObjectStatus.ACTIVE,
      created_at: '',
      updated_at: '',
      status: 'Pending',
      totalPrice: '',
      user: {
        id: '',
        is_active: 0,
        name: '',
        email: '',
        role: '',
        phone: '',
        is_verified: false
      },
      cart: {
        id: '',
        is_active: EObjectStatus.ACTIVE,
        created_at: '',
        updated_at: '',
        items: []
      },
      shippingInfo: {
        first_name: '',
        last_name: '',
        company_name: '',
        email: '',
        phone: '',
        address: '',
        district_id: ''
      },
      delivery_charge: '',
      payments: []
    }),
    []
  );

  const [searchBy, setSerarchBy] = useState<SearchKey>('name');

  const [searchQuery, setSearchQuery] = useMemo(() => {
    switch (searchBy) {
      case 'name':
        return [nameQuery, setNameQuery];
      case 'email':
        return [emailQuery, setEmailQuery];
      case 'phone':
        return [phoneQuery, setPhoneQuery];
      case 'orderId':
        return [orderIdQuery, setOrderIdQuery];
      default:
        return [nameQuery, setNameQuery];
    }
  }, [
    emailQuery,
    nameQuery,
    orderIdQuery,
    phoneQuery,
    searchBy,
    setEmailQuery,
    setNameQuery,
    setOrderIdQuery,
    setPhoneQuery
  ]);

  const handleSearchKeyChange = useCallback(
    (val: string) => {
      setSerarchBy(val as SearchKey);

      // Reset all query
      setNameQuery(null);
      setEmailQuery(null);
      setPhoneQuery(null);
      setOrderIdQuery(null);
    },
    [setEmailQuery, setNameQuery, setOrderIdQuery, setPhoneQuery]
  );

  return (
    <div className='flex flex-col items-center justify-between gap-2 sm:flex-row'>
      <div className='flex w-full items-end gap-4 sm:w-fit'>
        <DataTableSearch
          searchKey={searchBy}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />

        <div className='flex flex-col gap-3'>
          <Label>Search By</Label>
          <Select value={searchBy} onValueChange={handleSearchKeyChange}>
            <SelectTrigger className='w-28 capitalize'>
              <SelectValue placeholder='Search By' />
            </SelectTrigger>

            <SelectContent>
              {searchKeys.map((item) => (
                <SelectItem className='capitalize' key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button className='group w-full gap-1 self-end sm:w-fit'>
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
              options={Object.keys(sentinelProduct).map((item) => ({
                value: item,
                label: keyToLabel(item)
              }))}
              setFilterValue={setSortQuery}
              filterValue={sortQuery}
            />

            <div className='flex flex-col gap-2'>
              <Label>Status</Label>
              <DataTableFilterSelect
                key={statusQuery}
                filterKey='status'
                title='Status'
                options={[
                  {
                    value: 'Pending',
                    label: 'Pending'
                  },
                  {
                    value: 'Confirmed',
                    label: 'Confirmed'
                  },
                  {
                    value: 'On The Way',
                    label: 'On The Way'
                  },
                  {
                    value: 'Delivered',
                    label: 'Delivered'
                  }
                ]}
                setFilterValue={setStatusQuery}
                filterValue={statusQuery}
              />
            </div>

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
