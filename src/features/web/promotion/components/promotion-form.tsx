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
import { IPromotion } from 'types/schema/promotion.schema';
import { SiteConfig } from '@/constants/site-config';
import updatePromotion from '@/app/(server)/actions/web/promotion/update-promotion.controller';
import { Textarea } from '@/components/ui/textarea';
import { FileUploader } from '@/components/file-uploader';
import { RangedDatePicker } from '@/components/ui/ranged-date-picker';
import { DateRange, isDateRange } from 'react-day-picker';
import ProductSearchCombobox from '@/components/product-search-combobox';

const MAX_FILE_SIZE = SiteConfig.featureFlags.maxFileSize;
const ACCEPTED_IMAGE_TYPES = SiteConfig.featureFlags.acceptedImageTypes;

const promotionSchema = z.object({
  title: z.string(),
  subTitle: z.string(),
  dateRange: z.custom<DateRange>((val) => {
    return isDateRange(val);
  }, 'Invalid Date Range.'),
  promotionImage: z
    .any()
    .refine((files) => files?.length === 1, 'Thumbnail image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max thumbnail size is 5MB.`
    )
    .refine(
      (files) =>
        files?.[0]?.preview
          ? true
          : ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png, and .webp files are accepted.'
    ),
  product_id: z.string()
});

interface IPromotionFormProps {
  initialData?: IPromotion;
  pageTitle: string;
}

export default function PromotionForm({
  initialData,
  pageTitle
}: IPromotionFormProps) {
  const form = useForm<z.infer<typeof promotionSchema>>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      subTitle: initialData?.subTitle ?? '',
      dateRange: {
        from: initialData?.startDate
          ? new Date(initialData.startDate)
          : new Date(),
        to: initialData?.endDate ? new Date(initialData.endDate) : undefined
      },
      promotionImage: initialData?.promotionImage
        ? [
            {
              name: `${initialData.title}`,
              preview: initialData.promotionImage,
              size: 0
            }
          ]
        : undefined,
      product_id: initialData?.product?.id ?? ''
    }
  });

  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const [loading, startAPICall] = useTransition();

  const onSubmit = async (values: z.infer<typeof promotionSchema>) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key !== 'promotionImage') {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}`, item);
          });
        } else if (value && typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      }
    });

    if (values.promotionImage && values.promotionImage[0] instanceof File) {
      formData.append('promotionImage', values.promotionImage[0]);
    } else {
      console.error('Promotion Image is not a file');
    }

    formData.append('startDate', values.dateRange.from?.toDateString() ?? '');
    formData.append('endDate', values.dateRange.to?.toDateString() ?? '');

    startAPICall(async () => {
      try {
        const data = await updatePromotion({
          data: formData,
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
        console.error('Failed to update promotion. Error:', error);
        toast.error('Something went wrong!');
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
              onSubmit={form.handleSubmit(onSubmit, (error) => {
                setOpen(true);
              })}
              className='space-y-8'
            >
              <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4'>
                <FormField
                  control={form.control}
                  name='promotionImage'
                  render={({ field }) => (
                    <FormItem className='col-span-full'>
                      <FormLabel>Promotion Image</FormLabel>
                      <FormControl>
                        <FileUploader
                          disabled={loading}
                          value={field.value}
                          onValueChange={field.onChange}
                          maxFiles={1}
                          maxSize={MAX_FILE_SIZE}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem className='col-span-full'>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Promotion Title'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='subTitle'
                  render={({ field }) => (
                    <FormItem className='col-span-full'>
                      <FormLabel>Subtitle</FormLabel>
                      <FormControl>
                        <Textarea
                          className='resize-none'
                          rows={4}
                          disabled={loading}
                          placeholder='Promotion Subtitle'
                          {...field}
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
                      <FormLabel>Promotion Duration</FormLabel>
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
              </div>

              <Button disabled={loading} type='submit'>
                {initialData ? 'Update Promotion' : 'Create Promotion'}
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
