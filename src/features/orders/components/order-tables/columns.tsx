'use client';
import { ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { IOrder } from 'types/schema/order.schema';
import { CurrencySymbols } from '@/constants/currency-symbol';
import TextCapsule from '@/components/text-capsule';
import ViewAction from './view-action';

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: 'id',
    header: 'ORDER ID',
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
    accessorKey: 'created_at',
    header: 'DATE',
    cell: ({ row }) => (
      <>{new Date(row.original.created_at).toLocaleDateString('en-GB')}</>
    )
  },
  {
    accessorKey: 'totalPrice',
    header: 'TOTAL',
    cell: ({ row }) => (
      <>
        <CurrencySymbols.default /> {row.original.totalPrice} (
        {row.original.cart.items.length} Product
        {row.original.cart.items.length > 1 ? 's' : ''})
      </>
    )
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Payment Method',
    cell: ({ row }) => (
      <TextCapsule
        className={cn(
          'bg-green-500 text-white',
          row.original.paymentMethod === 'BKASH' && 'bg-red-400',
          row.original.paymentMethod === 'SSL' && 'bg-blue-500'
        )}
      >
        {row.original.paymentMethod === 'BKASH' ? (
          'BKash'
        ) : row.original.paymentMethod === 'SSL' ? (
          'SSLCommerz'
        ) : (
          <>
            <span className='hidden md:inline'>Cash on Delivery</span>
            <span className='md:hidden'>Cash</span>
          </>
        )}
      </TextCapsule>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <TextCapsule
        className={cn(
          'bg-red-500 text-white',
          (row.original.status === 'Confirmed' ||
            row.original.status === 'Paid') &&
            'bg-purple-500',
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
    cell: ({ row }) => <ViewAction data={row.original} />
  }
];
