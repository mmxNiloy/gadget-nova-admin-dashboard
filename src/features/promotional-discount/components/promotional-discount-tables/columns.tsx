'use client';
import { ColumnDef } from '@tanstack/react-table';
import { IPromotionalDiscount } from 'types/schema/product.shema';
import TextCapsule from '@/components/text-capsule';
import { cn } from '@/lib/utils';
import { CellAction } from './cell-action';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { AvatarPicker } from '@/components/ui/avatar-picker';
import { Skeleton } from '@/components/ui/skeleton';
import { CurrencySymbols } from '@/constants/currency-symbol';

export const columns: ColumnDef<IPromotionalDiscount>[] = [
  {
    id: 'thumbnail',
    header: 'Image',
    cell: ({ row }) => {
      return (
        <AvatarPicker
          src={row.original.product?.thumbnail}
          alt={row.original.product?.title}
          skeleton={<Skeleton className='size-full' />}
          variant='square'
          readOnly
          className='size-16 rounded-lg bg-muted/20 object-contain object-center p-0.5'
        />
      );
    }
  },
  {
    id: 'product-name',
    header: 'Product',
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className='text-start'>
            <p className='line-clamp-2 max-w-64 overflow-clip text-ellipsis'>
              {row.original.product?.title}
            </p>
          </TooltipTrigger>

          <TooltipContent>{row.original.product?.title}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
  {
    accessorKey: 'amount',
    header: 'Discount Amount',
    cell: ({ row }) => (
      <p className='text-nowrap'>
        {!row.original.is_percentage && (
          <>
            <CurrencySymbols.default />{' '}
          </>
        )}
        {row.original.amount}
        {row.original.is_percentage && '%'}
      </p>
    )
  },
  {
    accessorKey: 'start_date',
    header: 'Start Date',
    cell: ({ row }) =>
      row.original.startDate
        ? new Date(row.original.startDate).toLocaleDateString('en-GB')
        : 'N/A'
  },
  {
    accessorKey: 'end_date',
    header: 'End Date',
    cell: ({ row }) =>
      row.original.endDate
        ? new Date(row.original.endDate).toLocaleDateString('en-GB')
        : 'N/A'
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
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
