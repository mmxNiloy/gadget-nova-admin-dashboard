'use client';
import { ColumnDef } from '@tanstack/react-table';
import { AvatarPicker } from '@/components/ui/avatar-picker';
import { CellAction } from './cell-action';
import { IPromotion } from 'types/schema/promotion.schema';
import TextCapsule from '@/components/text-capsule';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

export const columns: ColumnDef<IPromotion>[] = [
  {
    id: 'promotion-img',
    header: 'Image',
    cell: ({ row }) => {
      return (
        <AvatarPicker
          src={row.original.promotionImage}
          alt={row.original.title}
          readOnly
          variant='square'
          className='size-10 p-0'
        />
      );
    }
  },
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'subTitle',
    header: 'Subtitle'
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) =>
      row.original.startDate
        ? new Date(row.original.startDate).toLocaleDateString('en-GB')
        : 'N/A'
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) =>
      row.original.endDate
        ? new Date(row.original.endDate).toLocaleDateString('en-GB')
        : 'N/A'
  },
  {
    id: 'product',
    header: 'Product',
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <p className='line-clamp-2 max-w-48 overflow-hidden text-ellipsis text-start text-sm'>
              {row.original.product?.title}
            </p>
          </TooltipTrigger>

          <TooltipContent>{row.original.product?.title}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
