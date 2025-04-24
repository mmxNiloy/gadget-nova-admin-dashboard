'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import FormErrorAlertDialog from '@/components/form-error-alert-dialog';
import { RangedDatePicker } from '@/components/ui/ranged-date-picker';
import { DateRange, isDateRange } from 'react-day-picker';
import ProductSearchCombobox from '@/components/product-search-combobox';
import { IPromotionalDiscount } from 'types/schema/product.shema';
import updatePromotionalDiscount from '@/app/(server)/actions/promotional-discount/update-promotional-discount.controller';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const promotionSchema = z
  .object({
    is_percentage: z.number().min(0).max(1).default(0),
    amount: z.number().nonnegative().default(0),
    dateRange: z
      .custom<DateRange>((val) => {
        return isDateRange(val);
      }, 'Invalid Date Range.')
      .refine((range) => !!range.from, 'A start date is requied.')
      .refine((range) => !!range.to, 'An end date is required.'),
    product_id: z.string()
  })
  .refine(
    (values) => {
      if (values.is_percentage)
        return values.amount >= 0 && values.amount <= 100;
      else return true;
    },
    { message: 'Invalid percentage amount.', path: ['amount'] }
  );

interface IPromotionFormProps {
  initialData?: IPromotionalDiscount;
  pageTitle: string;
}

export default function PromotionalDiscountForm({
  initialData,
  pageTitle
}: IPromotionFormProps) {
  const form = useForm<z.infer<typeof promotionSchema>>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      is_percentage: initialData?.is_percentage ?? 0,
      amount: initialData?.amount ?? 0,
      dateRange: {
        from: initialData?.startDate
          ? new Date(initialData.startDate)
          : new Date(),
        to: initialData?.endDate ? new Date(initialData.endDate) : undefined
      },
      product_id: initialData?.product?.id ?? ''
    }
  });

  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const [loading, startAPICall] = useTransition();

  const onSubmit = async (values: z.infer<typeof promotionSchema>) => {
    startAPICall(async () => {
      try {
        const data = await updatePromotionalDiscount({
          data: {
            ...values,
            startDate: values.dateRange.from?.toISOString() ?? '',
            endDate: values.dateRange.to?.toISOString() ?? ''
          },
          method: initialData ? 'PATCH' : 'POST',
          id: initialData?.id
        });
        if (data.ok) {
          toast.success('Update Successful!');
          router.push('.');
        } else {
          toast.error(`Update Failed! Cause: ${data.error.message}`);
        }
      } catch (error) {
        console.error('Failed to update promotional discount. Error:', error);
        toast.error('Something went wrong!');
      }
    });
  };

  const isPercentage = form.watch('is_percentage');

  return (
    <>
      <Card className='mx-auto w-full'>
        <CardHeader>
          <CardTitle className='text-left text-2xl font-bold'>
            {pageTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (error) => {
                setOpen(true);
              })}
              className='space-y-8'
            >
              <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4'>
                <FormField
                  control={form.control}
                  name='product_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Promotion Product</FormLabel>
                      <FormControl>
                        <ProductSearchCombobox
                          className='w-full'
                          disabled={loading}
                          value={field.value}
                          defaultProduct={initialData?.product}
                          onValueChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='is_percentage'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is Percentage?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          disabled={loading}
                          value={field.value == 0 ? 'no' : 'yes'}
                          onValueChange={(val) =>
                            field.onChange(val === 'yes' ? 1 : 0)
                          }
                        >
                          <div className='flex flex-col gap-2'>
                            <div className='flex gap-2'>
                              <RadioGroupItem
                                value='yes'
                                id='is-percentage-radio-yes'
                              />
                              <Label htmlFor='is-percentage-radio-yes'>
                                Yes
                              </Label>
                            </div>

                            <div className='flex gap-2'>
                              <RadioGroupItem
                                value='no'
                                id='is-percentage-radio-no'
                              />
                              <Label htmlFor='is-percentage-radio-no'>No</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='amount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Discount Amount{isPercentage ? '(%)' : ''}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          step={0.01}
                          min={0}
                          max={isPercentage ? 100 : undefined}
                          disabled={loading}
                          placeholder={`Discount Amount${isPercentage ? '(%)' : ''}`}
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(Number.parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='dateRange'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Promotional Discount Duration</FormLabel>
                      <FormControl>
                        <RangedDatePicker
                          disabled={loading}
                          value={field.value}
                          onValueChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button disabled={loading} type='submit'>
                {initialData
                  ? 'Update Promotional Discount'
                  : 'Create Promotional Discount'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <FormErrorAlertDialog
        open={open}
        onOpenChange={setOpen}
        errors={form.formState.errors}
      />
    </>
  );
}
