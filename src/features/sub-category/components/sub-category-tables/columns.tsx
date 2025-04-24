'use client';
import { ColumnDef } from '@tanstack/react-table';
import { ICategory } from 'types/schema/product.shema';
import TextCapsule from '@/components/text-capsule';
import { cn } from '@/lib/utils';
import { CellAction } from './cell-action';

export const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'is_featured',
    header: 'Is Featured?',
    cell: ({ row }) => (
      <TextCapsule
        className={cn(row.original.isFeatured && 'bg-purple-500 text-white')}
      >
        {row.original.isFeatured ? 'Featured' : 'No'}
      </TextCapsule>
    )
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
    id: 'parent-category',
    header: 'Parent Category',
    cell: ({ row }) => row.original.parentCategory?.name ?? 'N/A'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
