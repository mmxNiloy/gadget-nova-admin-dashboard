'use client';

import requestAPI from '@/app/(server)/actions/request-api.controller';
import { Icons } from '@/components/icons';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toCapCase } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState, useTransition } from 'react';
import { toast } from 'sonner';

interface IDeleteCategoryAlertDialogProps {
  itemId: string;
  actionProps?: any;
  itemName?: string;
  action?: ({
    id,
    ...props
  }: {
    id: string;
    props?: any;
  }) => Promise<Awaited<ReturnType<typeof requestAPI>>>;

  onSuccess?: () => void;
}

export default function DeleteItemAlertDialog({
  itemId,
  actionProps,
  action,
  itemName = 'Item',
  onSuccess
}: IDeleteCategoryAlertDialogProps) {
  const [loading, startAction] = useTransition();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const deleteItem = useCallback(() => {
    startAction(async () => {
      if (action) {
        const result = await action({ id: itemId, ...actionProps });
        if (result.ok) {
          toast.success(`${toCapCase(itemName)} deleted.`);
          setOpen(false);
          if (onSuccess) onSuccess();

          router.refresh();
        } else {
          toast.error(
            `Cannot delete ${itemName}. Cause: ${result.error.message}`
          );
        }
      } else toast.warning('Warning: No action was set.');
    });
  }, [action, actionProps, itemId, itemName, onSuccess, router]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={'ghost'}
          size={'sm'}
          className='w-full justify-start gap-2 px-2 text-sm'
        >
          <Icons.trash className='size-4' /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you really want to delete this {itemName}?<br />
            This action is
            <em>{' irreversible.'}</em>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button disabled={loading} variant={'ghost'}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button
            disabled={loading}
            variant={'destructive'}
            onClick={deleteItem}
            className='gap-2'
          >
            {loading && <Icons.spinner className='animate-spin' />}Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
