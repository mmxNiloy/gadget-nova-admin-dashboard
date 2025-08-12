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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Save } from 'lucide-react';
import React, { useCallback, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { IOrder, OrderStatusValues } from 'types/schema/order.schema';
import { z } from 'zod';

interface ActionsFormProps {
  data: IOrder;
  onSuccess?: () => void;
}

const FormSchema = z.object({
  status: z.enum(OrderStatusValues as [string, ...string[]]).default('Pending')
});

type FormType = z.infer<typeof FormSchema>;

export default function ActionsForm({ data, onSuccess }: ActionsFormProps) {
  const [loading, startUpdate] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm<FormType>({
    defaultValues: {
      status: data.status ?? 'Pending'
    },
    resolver: zodResolver(FormSchema),
    disabled: loading
  });

  const onSubmit = useCallback(
    (values: FormType) => {
      startUpdate(async () => {
        try {
          const result = await updateOrderStatus({
            id: data.id,
            data: values
          });

          if (result.ok) {
            toast.success('Order Status Updated Successfully!');
            setOpen(false);
            if (onSuccess) onSuccess();
            return;
          }

          toast.error(`Update Failed! Cause: ${result.error.message}`);
        } catch (err) {
          toast.error('Something went wrong. Please try again.');
          console.error(err);
        }
      });
    },
    [data.id, onSuccess]
  );

  const selectedStatus = form.watch('status');
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  disabled={field.disabled}
                  value={field.value}
                  onValueChange={(val) => field.onChange(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select a status' />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Order Status</SelectLabel>
                      {OrderStatusValues.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              type='button'
              disabled={loading || data.status === selectedStatus}
              className='bg-green-400 text-white hover:bg-green-400/90'
            >
              <Save /> Save
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Do you really want to update this order?
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <Button
                type='submit'
                onClick={form.handleSubmit(onSubmit)}
                disabled={loading}
                className='bg-green-400 text-white hover:bg-green-400/90'
              >
                {loading && <LoaderCircle className='animate-spin' />}
                {loading ? 'Updating...' : 'Update'}
              </Button>
              <AlertDialogCancel type='button'>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  );
}
