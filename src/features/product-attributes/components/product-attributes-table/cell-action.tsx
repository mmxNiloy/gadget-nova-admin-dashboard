'use client';
import deleteAttributeValue from '@/app/(server)/actions/attribute/value/delete-attribute-value.controller';
import DeleteItemAlertDialog from '@/components/delete-item-alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { IAttributeValue } from 'types/schema/product.shema';

interface CellActionProps {
  data: IAttributeValue;
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

          <Link href={`/dashboard/product/${data.id}`} passHref>
            <DropdownMenuItem>
              <Edit className='mr-2 h-4 w-4' /> Update
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem asChild>
            <DeleteItemAlertDialog
              itemName='Attribute Value'
              itemId={data.id}
              action={deleteAttributeValue}
              onSuccess={() => setOpen(false)}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
