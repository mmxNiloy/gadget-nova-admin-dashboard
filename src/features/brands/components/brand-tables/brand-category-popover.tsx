'use client';

import Icons from '@/components/ui/icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import React, { useMemo } from 'react';
import { IBrand, ICategory } from 'types/schema/product.shema';

interface IBrandCategoryPopoverProps {
  brand: IBrand;
  categories: ICategory[];
  filter?: 'all' | 'category' | 'subcategory';
}

export default function BrandCategoryPopover({
  brand,
  categories,
  filter = 'all'
}: IBrandCategoryPopoverProps) {
  const filteredCategories = useMemo(
    () =>
      categories.filter((item) => {
        if (filter === 'all') return true;
        else if (filter === 'category')
          return !item.parentCategory || !item.parent_category_id;
        else return item.parentCategory || item.parent_category_id;
      }),
    [categories, filter]
  );

  return (
    <Popover>
      <PopoverTrigger className='flex items-center justify-center gap-1'>
        {filteredCategories.length > 10
          ? '10+'
          : filteredCategories.length < 1
            ? 'Uncategorized'
            : `${filteredCategories.length} ${filter !== 'category' ? 'Subcategor' : 'Categor'}${filteredCategories.length < 2 ? 'y' : 'ies'}`}
        <Icons.chevronDown className='rotate-0 transition-all data-[state=open]:rotate-180' />
      </PopoverTrigger>

      <PopoverContent className='flex flex-col gap-1'>
        <p>{brand.name}</p>
        <p className='text-sm'>
          {filteredCategories.length < 1
            ? 'Uncategorized'
            : `${filter !== 'category' ? 'Subcategor' : 'Categor'}${filteredCategories.length < 2 ? 'y' : 'ies'}`}
        </p>
        <ul className='list-inside list-disc text-xs'>
          {filteredCategories.map(
            (cat, index) => index < 10 && <li key={cat.id}>{cat.name}</li>
          )}
          {filteredCategories.length > 10 && (
            <li>+${filteredCategories.length - 10} more</li>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
