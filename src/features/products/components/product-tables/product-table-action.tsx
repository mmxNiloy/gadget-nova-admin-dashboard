'use client';

import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { useProductTableFilters } from './use-product-table-filters';
import { IBrand, ICategory, IProduct } from 'types/schema/product.shema';
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
import { useMemo } from 'react';
import { EObjectStatus } from 'types/enum/object-status.enum';
import { Label } from '@/components/ui/label';

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
    setProductCodeQuery,
    tagsQuery,
    setTagsQuery
  } = useProductTableFilters();

  const sentinelProduct = useMemo(
    (): IProduct => ({
      id: '',
      is_active: EObjectStatus.ACTIVE,
      created_at: '',
      updated_at: '',
      title: '',
      slug: '',
      metaTitle: '',
      metaDescription: '',
      productCode: '',
      regularPrice: '',
      quantity: 0,
      description: '',
      keyFeatures: '',
      stockAmount: 0,
      holdAmount: 0,
      soldAmount: 0,
      thresholdAMount: 0,
      thumbnail: '',
      gallery: [],
      specifications: '',
      isTrending: false,
      isFeatured: false,
      isInStock: false,
      trendingStartDate: '',
      trendingEndDate: '',
      featuredStartDate: '',
      featuredEndDate: '',
      category: {} as ICategory,
      brand: {} as IBrand,
      questions: [],
      ratings: [],
      productAttributes: [],
      isBestSeller: false
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
            filterKey='tags'
            title='Tags'
            options={[
              { label: 'Trending', value: 'isTrending' },
              { label: 'Featured', value: 'isFeatured' },
              { label: 'Best Seller', value: 'isBestSeller' },
              { label: 'In Stock', value: 'isInStock' }
            ]}
            setFilterValue={setTagsQuery}
            filterValue={tagsQuery}
          />
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
  );
}
