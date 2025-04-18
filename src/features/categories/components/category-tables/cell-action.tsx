import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal } from 'lucide-react';
import { ICategory } from 'types/schema/product.shema';
import DeleteItemAlertDialog from '../../../../components/delete-item-alert-dialog';
import Link from 'next/link';
import deleteCategory from '@/app/(server)/actions/category/delete-category.controller';
import { useState } from 'react';

interface CellActionProps {
  data: ICategory;
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

          <Link href={`/dashboard/category/${data.id}`} passHref>
            <DropdownMenuItem>
              <Edit className='mr-2 h-4 w-4' /> Update
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem asChild>
            <DeleteItemAlertDialog
              itemId={data.id}
              itemName='Category'
              action={deleteCategory}
              onSuccess={() => setOpen(false)}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
