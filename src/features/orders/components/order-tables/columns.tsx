'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import TextCapsule from '@/components/text-capsule';
import { cn } from '@/lib/utils';
import { IOrder } from 'types/schema/order.schema';
import CartPreviewDialog from './cart-preview-dialog';
import { CurrencySymbols } from '@/constants/currency-symbol';

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <p
        title={row.original.id}
        className='line-clamp-1 max-w-32 overflow-clip text-ellipsis lg:max-w-full'
      >
        {row.original.id}
      </p>
    )
  },
  {
    id: 'customer',
    header: 'Customer',
    cell: ({ row }) => row.original.user.name
  },
  {
    accessorKey: 'totalPrice',
    header: 'Amount',
    cell: ({ row }) => (
      <>
        <CurrencySymbols.default /> {row.original.totalPrice}
      </>
    )
  },
  {
    id: 'cart',
    header: 'Cart',
    cell: ({ row }) => (
      <CartPreviewDialog
        totalPrice={row.original.totalPrice}
        data={row.original.carts}
      />
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <TextCapsule
        className={cn(
          'bg-red-500 text-white',
          row.original.status === 'Confirmed' && 'bg-purple-500',
          row.original.status === 'Delivered' && 'bg-green-500',
          row.original.status === 'On The Way' && 'bg-blue-500',
          row.original.status === 'Pending' && 'bg-yellow-500'
        )}
      >
        {row.original.status}
      </TextCapsule>
    )
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
