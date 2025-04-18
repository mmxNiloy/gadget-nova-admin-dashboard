'use client';
import deleteProduct from '@/app/(server)/actions/product/delete-product.controller';
import DeleteItemAlertDialog from '@/components/delete-item-alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Icons from '@/components/ui/icons';
import { SiteConfig } from '@/constants/site-config';
import { Edit, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { IProduct } from 'types/schema/product.shema';

interface CellActionProps {
  data: IProduct;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <Link
            passHref
            target='_blank'
            href={`${SiteConfig.featureFlags.stagingURL}/product/${data.id}?preview=true`}
          >
            <DropdownMenuItem>
              <Icons.visible className='mr-2 h-4 w-4' /> Preview
            </DropdownMenuItem>
          </Link>

          <Link href={`/dashboard/product/${data.id}`} passHref>
            <DropdownMenuItem>
              <Edit className='mr-2 h-4 w-4' /> Update
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem asChild>
            <DeleteItemAlertDialog
              itemName='Product'
              itemId={data.id}
              action={deleteProduct}
              onSuccess={() => setOpen(false)}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
