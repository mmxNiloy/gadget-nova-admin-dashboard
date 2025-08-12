'use client';
import { ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { IOrder, IPayment } from 'types/schema/order.schema';
import { CurrencySymbols } from '@/constants/currency-symbol';
import TextCapsule from '@/components/text-capsule';
import ViewAction from './view-action';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { getPaymentMethodTitle } from '@/constants/site-payment-methods';

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: 'id',
    header: 'ORDER ID',
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className='line-clamp-1 max-w-32 overflow-clip text-ellipsis'>
              {row.original.id}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.original.id}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
  {
    accessorKey: 'customer-name',
    header: 'CUSTOMER',
    cell: ({ row }) => (
      <p className='line-clamp-1 max-w-32 overflow-clip text-ellipsis'>
        {[
          row.original.shippingInfo.first_name,
          row.original.shippingInfo.last_name
        ]
          .filter((item) => item.length > 0)
          .join(' ')}
      </p>
    )
  },
  {
    accessorKey: 'customer-email',
    header: 'Email',
    cell: ({ row }) => (
      <p className='line-clamp-1 max-w-48 overflow-clip text-ellipsis break-words'>
        {row.original.shippingInfo.email ?? 'N/A'}
      </p>
    )
  },
  {
    accessorKey: 'customer-phone',
    header: 'Phone',
    cell: ({ row }) => (
      <p className='line-clamp-1 max-w-32 overflow-clip text-ellipsis break-words'>
        {row.original.shippingInfo.phone ?? 'N/A'}
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
      <p className='whitespace-nowrap'>
        <CurrencySymbols.default className='text-xs' />{' '}
        {row.original.totalPrice}
      </p>
    )
  },
  {
    accessorKey: 'payment-status',
    header: 'Payment Status',
    cell: ({ row }) => <PaymentStatusCapsule data={row.original.payments[0]} />
  },
  {
    accessorKey: 'payment-method',
    header: 'Payment Method',
    cell: ({ row }) =>
      getPaymentMethodTitle(row.original.payments.at(0)?.paymentMethod)
  },
  {
    accessorKey: 'order-status',
    header: 'Order Status',
    cell: ({ row }) => (
      <TextCapsule
        className={cn(
          'bg-red-100 text-red-800',
          (row.original.status === 'Confirmed' ||
            row.original.status === 'Paid') &&
            'bg-fuchsia-100 text-fuchsia-800',
          row.original.status === 'Delivered' &&
            'bg-emerald-100 text-emerald-800',
          row.original.status === 'On The Way' &&
            'bg-indigo-100 text-indigo-800',
          row.original.status === 'Pending' && 'bg-amber-100 text-amber-800'
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

function PaymentStatusCapsule({ data }: { data?: IPayment }) {
  if (data?.paymentMethod === 'COD') {
    return <TextCapsule>N/A</TextCapsule>;
  }

  return (
    <TextCapsule
      className={cn(
        'bg-amber-100 text-amber-800',
        (data?.paymentStatus === 'Confirmed' ||
          data?.paymentStatus === 'Paid') &&
          'bg-emerald-100 text-emerald-800',
        data?.paymentStatus === 'Refunded' && 'bg-indigo-100 text-indigo-800',
        data?.paymentStatus === 'Failed' && 'bg-red-100 text-red-800'
      )}
    >
      {data?.paymentStatus ?? 'Pending'}
    </TextCapsule>
  );
}
