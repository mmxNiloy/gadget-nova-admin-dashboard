// File: features/categories/components/category-form.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ICoupon } from 'types/schema/coupon.schema';
import updateCoupon from '@/app/(server)/actions/coupon/update-coupon.controller';
import { CurrencySymbols } from '@/constants/currency-symbol';
import { ChevronsUpDown, PercentCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { format, isDate } from 'date-fns';
import UserSearchCombobox from '@/components/user-search-combobox';
import { ProductMultiselect } from '@/components/product-multiselect';
import { MultiSelect } from '@/components/ui/multi-select';
import { IBrand, ICategory } from 'types/schema/product.shema';

// Zod schema for UpdateCategoryDto
const couponSchema = z.object({
  couponCode: z
    .string()
    .min(3, { message: 'Coupon Code must be at least 3 characters' })
    .regex(/^[A-Za-z0-9]+$/, 'Coupon Code must be alphanumeric')
    .toUpperCase(),
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters' }),
  couponType: z
    .enum(['PERCENTAGE', 'FLAT', 'DELIVERY_CHARGE'])
    .default('PERCENTAGE'),
  couponValue: z.coerce.number().positive(),
  maximumDiscountLimit: z.coerce.number().positive(),
  minimumOrderAmount: z.coerce.number().positive(),
  startDate: z.string().date(),
  endDate: z.string().date(),
  usageLimitPerUser: z.coerce.number().positive().default(1),
  applicableProductIds: z.array(z.string()).default([]).optional(),
  applicableCategoryIds: z.array(z.string()).default([]).optional(),
  applicableSubCategoryIds: z.array(z.string()).default([]).optional(),
  applicableBrandIds: z.array(z.string()).default([]).optional(),
  couponUsageType: z
    .enum(['SINGLE_USAGE', 'MULTI_USAGE'])
    .default('SINGLE_USAGE'),
  userId: z.string().optional()
});

type FormType = z.infer<typeof couponSchema>;

interface CategoryFormProps {
  initialData?: ICoupon;
  pageTitle: string;
  categories: ICategory[];
  subcategories: ICategory[];
  brands: IBrand[];
}

export default function CouponForm({
  initialData,
  pageTitle,
  categories,
  subcategories,
  brands
}: CategoryFormProps) {
  const [open, setOpen] = useState<boolean>(false);

  const defaultValues: FormType = {
    couponCode: initialData?.couponCode || '',
    description: initialData?.description || '',
    couponType: initialData?.couponType || 'PERCENTAGE',
    couponValue: initialData?.couponValue || 0,
    maximumDiscountLimit: initialData?.maximumDiscountLimit || 0,
    minimumOrderAmount: initialData?.minimumOrderAmount || 0,
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    usageLimitPerUser: initialData?.usageLimitPerUser || 0,
    applicableProductIds:
      initialData?.applicableProducts?.map((item) => item.id) || [],
    applicableCategoryIds:
      initialData?.applicableCategories?.map((item) => item.id) || [],
    applicableSubCategoryIds:
      initialData?.applicableSubCategories?.map((item) => item.id) || [],
    applicableBrandIds:
      initialData?.applicableBrands?.map((item) => item.id) || [],
    couponUsageType: initialData?.couponUsageType || 'SINGLE_USAGE',
    userId: initialData?.userId || ''
  };

  const [loading, startAPICall] = useTransition();
  const form = useForm<z.infer<typeof couponSchema>>({
    resolver: zodResolver(couponSchema),
    defaultValues,
    disabled: loading
  });

  const couponType = form.watch('couponType');

  const router = useRouter();

  const onSubmit = async (values: FormType) => {
    startAPICall(async () => {
      const data = await updateCoupon({
        data: values,
        method: initialData ? 'PATCH' : 'POST',
        id: initialData?.id
      });
      if (data.ok) {
        toast.success('Coupon Update Successful!');
        router.push('/dashboard/coupon'); // Redirect to categories list
      } else {
        toast.error(`Coupon Update Failed! Cause: ${data.error.message}`);
      }
    });
  };

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
              onSubmit={form.handleSubmit(onSubmit, () => setOpen(true))}
              className='space-y-8'
            >
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='couponCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon Code</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter coupon code'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='couponValue'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon Value</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            type='number'
                            step={0.01}
                            disabled={loading}
                            placeholder='Enter coupon value'
                            className='pl-8'
                            {...field}
                          />

                          <div className='pointer-events-none absolute inset-y-0 left-2 flex items-center pr-3'>
                            <span className='text-gray-500'>
                              {couponType === 'PERCENTAGE' ? (
                                <PercentCircle className='size-5' />
                              ) : (
                                <CurrencySymbols.default />
                              )}
                            </span>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='couponType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <div className='flex flex-col gap-2'>
                            <div className='flex gap-2'>
                              <RadioGroupItem
                                value='PERCENTAGE'
                                id='coupon-type-percentage-radio'
                              />
                              <Label htmlFor='coupon-type-percentage-radio'>
                                Percentage
                              </Label>
                            </div>
                            <div className='flex gap-2'>
                              <RadioGroupItem
                                value='FLAT'
                                id='coupon-type-flat-radio'
                              />
                              <Label htmlFor='coupon-type-flat-radio'>
                                Flat
                              </Label>
                            </div>
                            <div className='flex gap-2'>
                              <RadioGroupItem
                                value='DELIVERY_CHARGE'
                                id='coupon-type-delivery-charge-radio'
                              />
                              <Label htmlFor='coupon-type-delivery-charge-radio'>
                                Delivery Charge
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <span></span>

                <FormField
                  control={form.control}
                  name='maximumDiscountLimit'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Discount</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            type='number'
                            step={0.01}
                            disabled={loading}
                            placeholder='Enter max discount'
                            className='pl-8'
                            {...field}
                          />

                          <div className='pointer-events-none absolute inset-y-0 left-2 flex items-center pr-3'>
                            <span className='text-gray-500'>
                              <CurrencySymbols.default />
                            </span>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='minimumOrderAmount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Order</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            type='number'
                            step={0.01}
                            disabled={loading}
                            placeholder='Enter min order'
                            className='pl-8'
                            {...field}
                          />

                          <div className='pointer-events-none absolute inset-y-0 left-2 flex items-center pr-3'>
                            <span className='text-gray-500'>
                              <CurrencySymbols.default />
                            </span>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Start Date and end date */}
                <FormField
                  control={form.control}
                  name='startDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input
                          type='date'
                          disabled={loading}
                          value={
                            isDate(field.value)
                              ? format(new Date(field.value), 'yyyy-MM-dd')
                              : undefined
                          }
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='endDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input
                          type='date'
                          disabled={loading}
                          value={
                            isDate(field.value)
                              ? format(new Date(field.value), 'yyyy-MM-dd')
                              : undefined
                          }
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='usageLimitPerUser'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usage Limit (Per User)</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          step={1}
                          disabled={loading}
                          placeholder='Enter usage limit per user'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='couponUsageType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon Usage Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <div className='flex flex-col gap-2'>
                            <div className='flex gap-2'>
                              <RadioGroupItem
                                value='SINGLE_USAGE'
                                id='coupon-usage-type-single-usage-radio'
                              />
                              <Label htmlFor='coupon-usage-type-single-usage-radio'>
                                Single Usage
                              </Label>
                            </div>
                            <div className='flex gap-2'>
                              <RadioGroupItem
                                value='MULTI_USAGE'
                                id='coupon-usage-type-multi-usage-radio'
                              />
                              <Label htmlFor='coupon-usage-type-multi-usage-radio'>
                                Multi Usage
                              </Label>
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
                  name='description'
                  render={({ field }) => (
                    <FormItem className='col-span-full'>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Enter description'
                          className='resize-none'
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h5 className='col-span-full font-semibold'>Applicable To</h5>

                <FormField
                  control={form.control}
                  name='userId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User</FormLabel>
                      <FormControl>
                        <UserSearchCombobox
                          className='w-full'
                          value={field.value}
                          onValueChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Leave blank to apply to all users
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <span></span>

                <FormField
                  control={form.control}
                  name='applicableProductIds'
                  render={({ field }) => (
                    <FormItem className='col-span-full lg:col-span-1'>
                      <FormLabel>Applicable Products</FormLabel>
                      <FormControl>
                        <ProductMultiselect
                          type='button'
                          className='h-10 w-full justify-between text-muted-foreground [&_svg]:size-4'
                          placeholder='Applies to all products'
                          value={field.value}
                          onValueChanged={field.onChange}
                          variant='outline'
                        >
                          Select Products
                          <ChevronsUpDown />
                        </ProductMultiselect>
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Leave blank to apply to all products
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='applicableCategoryIds'
                  render={({ field }) => (
                    <FormItem className='col-span-full lg:col-span-1'>
                      <FormLabel>Applicable Categories</FormLabel>
                      <FormControl>
                        <MultiSelect
                          key={field.value?.join('.') ?? ''}
                          disabled={loading}
                          className='w-full'
                          title='Select Categories'
                          defaultValue={field.value ?? undefined}
                          onValueChange={field.onChange}
                          options={categories.map((cat) => ({
                            label: cat.name,
                            value: cat.id
                          }))}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Leave blank to apply to all categories
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='applicableSubCategoryIds'
                  render={({ field }) => (
                    <FormItem className='col-span-full lg:col-span-1'>
                      <FormLabel>Applicable Subcategories</FormLabel>
                      <FormControl>
                        <MultiSelect
                          key={field.value?.join('.') ?? ''}
                          disabled={loading}
                          className='w-full'
                          title='Select Subcategories'
                          defaultValue={field.value ?? undefined}
                          onValueChange={field.onChange}
                          options={subcategories.map((cat) => ({
                            label: cat.name,
                            value: cat.id
                          }))}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Leave blank to apply to all subcategories
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='applicableBrandIds'
                  render={({ field }) => (
                    <FormItem className='col-span-full lg:col-span-1'>
                      <FormLabel>Applicable Brands</FormLabel>
                      <FormControl>
                        <MultiSelect
                          key={field.value?.join('.') ?? ''}
                          disabled={loading}
                          className='w-full'
                          title='Select Brands'
                          defaultValue={field.value ?? undefined}
                          onValueChange={field.onChange}
                          options={brands.map((b) => ({
                            label: b.name,
                            value: b.id
                          }))}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Leave blank to apply to all brands
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              <Button disabled={loading} type='submit'>
                {initialData ? 'Update' : 'Create'} Coupon
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
