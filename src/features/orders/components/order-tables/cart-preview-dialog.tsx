import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import Icons from '@/components/ui/icons';
import React from 'react';
import { ICart } from 'types/schema/cart.schema';
import { AutoDataTable } from '@/components/ui/table/auto-data-table';
import { CartPreviewColumns } from './cart-preview-columns';
import { CurrencySymbols } from '@/constants/currency-symbol';

interface ICartPreviewDialogProps {
  data: ICart[];
  totalPrice: string;
}

export default function CartPreviewDialog({
  data,
  totalPrice
}: ICartPreviewDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'link'}
          className='gap-1 text-primary-foreground'
          disabled={data.length < 1}
        >
          {data.length > 0 ? (
            <>
              <Icons.popup className='hidden size-4 lg:block' />{' '}
              <p>
                View Cart
                <span className='hidden lg:block'>
                  ({data.length > 99 ? '99+' : data.length} items)
                </span>
              </p>
            </>
          ) : (
            <>No Items</>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[700px]'>
        <DialogHeader>
          <DialogTitle>Cart Preview</DialogTitle>
          <DialogDescription>Cart Items in the Order</DialogDescription>
        </DialogHeader>
        <div className='flex h-[70vh] flex-col gap-4'>
          <AutoDataTable
            className='min-h-[65vh]'
            columns={CartPreviewColumns}
            data={data}
            pageSizeOptions={[5, 10, 20]}
          />
          <div className='flex justify-end'>
            <p className='text-sm font-semibold'>
              Total: <CurrencySymbols.default />
              <span className='text-base'>{totalPrice}</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
