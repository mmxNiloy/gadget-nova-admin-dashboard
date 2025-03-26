import { CurrencySymbols } from '@/constants/currency-symbol';
import { ColumnDef } from '@tanstack/react-table';
import { ICart } from 'types/schema/cart.schema';

export const CartPreviewColumns: ColumnDef<ICart>[] = [
  {
    accessorKey: 'product.title',
    header: 'Product',
    cell: ({ row }) => (
      <span className='font-medium'>{row.original.product.title}</span>
    )
  },
  {
    accessorKey: 'quantity',
    header: () => <div className='text-right'>Qty</div>,
    cell: ({ row }) => <div className='text-right'>{row.original.quantity}</div>
  },
  {
    accessorKey: 'price',
    header: () => <div className='text-right'>Price</div>,
    cell: ({ row }) => (
      <div className='text-right'>
        <CurrencySymbols.default /> {row.original.price}
      </div>
    )
  },
  {
    id: 'subtotal',
    header: () => <div className='text-right'>Subtotal</div>,
    cell: ({ row }) => {
      const subtotal = (
        parseFloat(row.original.price) * row.original.quantity
      ).toFixed(2);
      return (
        <div className='text-right'>
          <CurrencySymbols.default /> {subtotal}
        </div>
      );
    }
  },
  {
    accessorKey: 'product.isInStock',
    header: 'Stock',
    cell: ({ row }) => (
      <span
        className={
          row.original.product.isInStock ? 'text-green-600' : 'text-red-600'
        }
      >
        {row.original.product.isInStock ? 'In Stock' : 'Out of Stock'}
      </span>
    )
  }
];
