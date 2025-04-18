'use client';
import updateOrderStatus from '@/app/(server)/actions/order/update-order-status.controller';
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
import { LabelledComboBox } from '@/components/ui/combobox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import Icons from '@/components/ui/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  IOrder,
  OrderStatusValues,
  TOrderStatus
} from 'types/schema/order.schema';
import { z } from 'zod';

interface IDialogProps {
  order: IOrder;
  setOpenDropdown?: React.Dispatch<React.SetStateAction<boolean>>;
}

const updateSchema = z.object({
  status: z.custom<TOrderStatus>()
});

export default function OrderStatusEditorDialog({
  order,
  setOpenDropdown
}: IDialogProps) {
  const form = useForm<z.infer<typeof updateSchema>>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      status: order.status
    }
  });
  const [open, setOpen] = useState(false);

  const [loading, startAPICall] = useTransition();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (values: z.infer<typeof updateSchema>) => {
      startAPICall(async () => {
        const data = await updateOrderStatus({
          data: values,
          id: order.id
        });
        if (data.ok) {
          toast.success('Order Status Update Successful!');
          setOpen(false);
          if (setOpenDropdown) setOpenDropdown(false);
          router.refresh();
        } else {
          toast.error(
            `Order Status Update Failed! Cause: ${data.error.message}`
          );
        }
      });
    },
    [order.id, router, setOpenDropdown]
  );

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className='relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-muted/40 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'>
        <Icons.edit className='mr-2 size-4' /> Update Status
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Select a status</AlertDialogTitle>
          <AlertDialogDescription>
            Select a status value you want to assign to this order.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem className='flex flex-col gap-2'>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <LabelledComboBox
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                      items={OrderStatusValues.map((st) => ({
                        value: st,
                        label: st
                      }))}
                      label='Select a status'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>Close</AlertDialogCancel>
              <Button
                disabled={loading}
                className='gap-2 bg-green-500 text-white'
              >
                {loading ? (
                  <Icons.spinner className='animate-spin' />
                ) : (
                  <Icons.check />
                )}{' '}
                Submit
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
