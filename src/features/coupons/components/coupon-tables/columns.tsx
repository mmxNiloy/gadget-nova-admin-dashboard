'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ICoupon } from 'types/schema/coupon.schema';
import { CellAction } from './cell-action';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CheckCircle, XCircle, Percent, Tag } from 'lucide-react';

export const columns: ColumnDef<ICoupon>[] = [
  {
    accessorKey: 'couponCode',
    header: 'Code',
    cell: ({ row }) => (
      <Badge variant='outline' className='w-fit px-2 py-0.5 font-semibold'>
        {row.original.couponCode}
      </Badge>
    )
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <span className='line-clamp-1 text-sm text-muted-foreground'>
        {row.original.description}
      </span>
    )
  },
  {
    accessorKey: 'couponType',
    header: 'Type',
    cell: ({ row }) => (
      <Badge
        variant='secondary'
        className='flex w-fit items-center gap-1 px-2 py-0.5'
      >
        <Tag className='h-3 w-3' /> {row.original.couponType}
      </Badge>
    )
  },
  {
    accessorKey: 'couponValue',
    header: 'Value',
    cell: ({ row }) => (
      <span className='flex items-center gap-1 font-medium'>
        {row.original.couponValue}
        <Percent className='h-3 w-3 text-muted-foreground' />
      </span>
    )
  },
  {
    accessorKey: 'maximumDiscountLimit',
    header: 'Max Discount',
    cell: ({ row }) => (
      <span className='text-sm'>
        ৳{row.original.maximumDiscountLimit.toLocaleString()}
      </span>
    )
  },
  {
    accessorKey: 'minimumOrderAmount',
    header: 'Min Order',
    cell: ({ row }) => (
      <span className='text-sm'>
        ৳{row.original.minimumOrderAmount.toLocaleString()}
      </span>
    )
  },
  {
    accessorKey: 'startDate',
    header: 'Start',
    cell: ({ row }) => (
      <span className='text-sm'>
        {format(new Date(row.original.startDate), 'dd MMM yyyy')}
      </span>
    )
  },
  {
    accessorKey: 'endDate',
    header: 'End',
    cell: ({ row }) => (
      <span className='text-sm'>
        {format(new Date(row.original.endDate), 'dd MMM yyyy')}
      </span>
    )
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ row }) =>
      row.original.is_active ? (
        <Badge
          variant='success'
          className='flex w-fit items-center gap-1 px-2 py-0.5'
        >
          <CheckCircle className='h-3 w-3' /> Active
        </Badge>
      ) : (
        <Badge
          variant='destructive'
          className='flex w-fit items-center gap-1 px-2 py-0.5'
        >
          <XCircle className='h-3 w-3' /> Inactive
        </Badge>
      )
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
