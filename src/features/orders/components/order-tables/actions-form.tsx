'use client';

import updatePaymentMethod from '@/app/(server)/actions/order/payment/update-payment-method.controller';
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
import {
  AllowedPaymentMethods,
  PaymentMethod
} from '@/constants/site-payment-methods';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Save } from 'lucide-react';
import React, { useCallback, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { IOrder, OrderStatusValues } from 'types/schema/order.schema';
import { z } from 'zod';

interface ActionsFormProps {
  data: IOrder;
  onSuccess?: () => void;
}

const PaymentMethodOptions: [PaymentMethod, ...PaymentMethod[]] = [
  'COD',
  'BKASH',
  'SSL'
];

const FormSchema = z.object({
  status: z.enum(OrderStatusValues as [string, ...string[]]).default('Pending'),
  paymentMethod: z.enum(PaymentMethodOptions).default('COD')
});

type FormType = z.infer<typeof FormSchema>;

export default function ActionsForm({ data, onSuccess }: ActionsFormProps) {
  const [loading, startUpdate] = useTransition();
  const [open, setOpen] = useState(false);

  const payment = useMemo(() => data.payments?.at(0), [data.payments]);

  const defaultValues: FormType = useMemo(
    () => ({
      status: data.status ?? 'Pending',
      paymentMethod: payment?.paymentMethod ?? 'COD'
    }),
    [data.status, payment?.paymentMethod]
  );

  const shouldShowPaymentMethod = useMemo(
    () =>
      payment &&
      payment.paymentMethod !== 'COD' &&
      payment.paymentStatus === 'Pending' &&
      data.status !== 'Paid' &&
      data.status !== 'Delivered' &&
      data.status !== 'Cancelled' &&
      data.status !== 'Failed',
    [data.status, payment]
  );

  const form = useForm<FormType>({
    defaultValues,
    resolver: zodResolver(FormSchema),
    disabled: loading
  });

  const updateCurrentOrderStatus = useCallback(
    async (status: string) => {
      try {
        const result = await updateOrderStatus({
          id: data.id,
          data: {
            status
          }
        });

        if (result.ok) {
          toast.success('Order Status Updated Successfully!');
          return true;
        }

        toast.error(`Update Failed! Cause: ${result.error.message}`);
      } catch (err) {
        toast.error('Something went wrong. Please try again.');
        console.error(err);
      }

      return false;
    },
    [data.id]
  );

  const updateCurrentPaymentMethod = useCallback(
    async (id: string, paymentMethod: PaymentMethod) => {
      try {
        const result = await updatePaymentMethod({
          id,
          data: {
            paymentMethod
          }
        });

        if (result.ok) {
          toast.success('Payment Status Updated Successfully!');
          return true;
        }

        toast.error(`Update Failed! Cause: ${result.error.message}`);
      } catch (err) {
        toast.error('Something went wrong. Please try again.');
        console.error(err);
      }
      return false;
    },
    []
  );

  const onSubmit = useCallback(
    (values: FormType) => {
      const { status, paymentMethod } = values;
      startUpdate(async () => {
        const jobs: Promise<boolean>[] = [];
        if (status !== defaultValues.status) {
          jobs.push(updateCurrentOrderStatus(status));
        }

        if (paymentMethod !== defaultValues.paymentMethod && payment) {
          jobs.push(updateCurrentPaymentMethod(payment.id, paymentMethod));
        }

        const results = await Promise.all(jobs);

        if (results.every((result) => result) && onSuccess) {
          onSuccess();
        }
      });
    },
    [
      defaultValues.paymentMethod,
      defaultValues.status,
      onSuccess,
      payment,
      updateCurrentOrderStatus,
      updateCurrentPaymentMethod
    ]
  );

  const selectedStatus = form.watch('status');
  const selectedMethod = form.watch('paymentMethod');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        {/* Order status field */}
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
                  <SelectTrigger className='h-8 text-xs'>
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

        {/* Payment method field */}
        {shouldShowPaymentMethod && (
          <FormField
            control={form.control}
            name='paymentMethod'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <Select
                    disabled={field.disabled}
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                  >
                    <SelectTrigger className='h-8 text-xs'>
                      <SelectValue placeholder='Select a payment method' />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Payment Methods</SelectLabel>
                        {AllowedPaymentMethods.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            {method.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              type='button'
              size='sm'
              disabled={
                loading ||
                (defaultValues.status === selectedStatus &&
                  defaultValues.paymentMethod === selectedMethod)
              }
              className='gap-1 bg-green-400 text-xs text-white hover:bg-green-400/90 [&_svg]:size-4'
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
