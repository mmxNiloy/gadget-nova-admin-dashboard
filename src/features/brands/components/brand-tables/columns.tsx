'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { IBrand } from 'types/schema/product.shema';
import TextCapsule from '@/components/text-capsule';
import { cn } from '@/lib/utils';
import BrandCategoryPopover from './brand-category-popover';

export const columns: ColumnDef<IBrand>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ row }) => (
      <TextCapsule
        className={cn(
          'bg-red-500 text-white',
          row.original.is_active && 'bg-green-500'
        )}
      >
        {row.original.is_active ? 'Active' : 'Inactive'}
      </TextCapsule>
    )
  },
  {
    accessorKey: 'category',
    header: 'Subcategory',
    cell: ({ row }) => (
      <BrandCategoryPopover
        categories={row.original.categories}
        brand={row.original}
        filter='all'
      />
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
