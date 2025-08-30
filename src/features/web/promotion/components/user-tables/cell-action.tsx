'use client';
import deletePromotion from '@/app/(server)/actions/web/promotion/delete-promotion.controller';
import DeleteItemAlertDialog from '@/components/delete-item-alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SiteConfig } from '@/constants/site-config';
import { Edit, EyeIcon, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { IPromotion } from 'types/schema/promotion.schema';

interface CellActionProps {
  data: IPromotion;
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

          <Link href={'https://www.gadgetnovabd.com/'} passHref>
            <DropdownMenuItem>
              <EyeIcon className='mr-2 h-4 w-4' /> Preview
            </DropdownMenuItem>
          </Link>

          <Link href={`/dashboard/web/promotion/${data.id}`} passHref>
            <DropdownMenuItem>
              <Edit className='mr-2 h-4 w-4' /> Update
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem asChild>
            <DeleteItemAlertDialog
              itemName='Promotion'
              itemId={data.id}
              action={deletePromotion}
              onSuccess={() => setOpen(false)}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
