'use client';

import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LabelledComboBox } from '@/components/ui/combobox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SiteConfig } from '@/constants/site-config';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  IAttributeValue,
  IBrand,
  ICategory,
  IProduct
} from 'types/schema/product.shema';
import * as z from 'zod';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { MultiSelect } from '@/components/ui/multi-select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import FormErrorAlertDialog from '@/components/form-error-alert-dialog';
import TiptapEditor from '@/components/NextTiptap/TiptapEditor';
import updateProduct from '@/lib/util/update-product.util';

const MAX_FILE_SIZE = SiteConfig.featureFlags.maxFileSize;
const ACCEPTED_IMAGE_TYPES = SiteConfig.featureFlags.acceptedImageTypes;

interface IFileWithPreview extends File {
  preview?: string;
}

// Base schema without thumbnail/gallery validation
const baseSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  slug: z.string().min(1, { message: 'Slug is required.' }),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  productCode: z.string().min(1, { message: 'Product code is required.' }),
  regularPrice: z
    .number()
    .min(0, { message: 'Regular price must be non-negative.' }),
  discountPrice: z
    .number()
    .min(0, { message: 'Discount price must be non-negative.' })
    .optional(),
  quantity: z
    .number()
    .int()
    .min(0, { message: 'Quantity must be a non-negative integer.' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters.' }),
  keyFeatures: z.string().optional(),
  specifications: z.string().optional(),
  thresholdAmount: z
    .number()
    .min(0, { message: 'Threshold amount must be non-negative.' })
    .optional(),
  category_id: z.string().min(1, { message: 'Category is required.' }),
  attribute_value_ids: z
    .array(z.string())
    .min(1, { message: 'At least one attribute is required.' }), // Updated validation
  brand_id: z.string().optional(),
  subcategory_id: z.string().optional().nullable(),
  isTrending: z.boolean(),
  isFeatured: z.boolean(),
  isBestSeller: z.boolean(),
  isInStock: z.boolean(),
  trendingStartDate: z.string().optional(),
  trendingEndDate: z.string().optional(),
  featuredStartDate: z.string().optional(),
  featuredEndDate: z.string().optional()
});

// File validation schema (applied conditionally)
const fileValidation = {
  thumbnail: z
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
  gallery: z
    .any()
    .refine((files) => files?.length >= 0, 'Gallery images are optional.')
    .refine(
      (files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE),
      `Max gallery image size is 5MB.`
    )
    .refine(
      (files) =>
        files?.every((file: IFileWithPreview) =>
          file.preview ? true : ACCEPTED_IMAGE_TYPES.includes(file.type)
        ),
      '.jpg, .jpeg, .png, and .webp files are accepted.'
    )
    .optional()
};

export default function ProductForm({
  initialData,
  brands,
  categories,
  subcategories,
  attributes,
  pageTitle
}: {
  initialData?: IProduct;
  pageTitle: string;
  brands: IBrand[];
  categories: ICategory[];
  attributes: IAttributeValue[];
  subcategories: ICategory[];
}) {
  // Conditional schema based on initialData
  const formSchema = initialData?.thumbnail
    ? baseSchema.extend({
        thumbnail: z.any().optional(),
        gallery: fileValidation.gallery
      })
    : baseSchema.extend({
        thumbnail: fileValidation.thumbnail,
        gallery: fileValidation.gallery
      });

  const defaultValues = {
    title: initialData?.title ?? '',
    slug: initialData?.slug ?? '',
    metaTitle: initialData?.metaTitle ?? '',
    metaDescription: initialData?.metaDescription ?? '',
    productCode: initialData?.productCode ?? '',
    regularPrice: Number.parseFloat(initialData?.regularPrice ?? '0'),
    discountPrice: Number.parseFloat(initialData?.discountPrice ?? '0'),
    quantity: initialData?.quantity ?? 0,
    description: initialData?.description ?? '',
    keyFeatures: initialData?.keyFeatures ?? '',
    specifications: initialData?.specifications ?? '',
    thresholdAmount: initialData?.thresholdAMount ?? undefined,
    category_id: initialData?.category.id ?? '',
    subcategory_id: initialData?.subCategory?.id ?? undefined,
    attribute_value_ids:
      initialData?.productAttributes?.map((item) => item.attributeValue.id) ??
      [], // Updated to use attributeValue_id
    brand_id: initialData?.brand.id ?? '',
    thumbnail: initialData?.thumbnail
      ? [
          {
            name: `${initialData.title}`,
            preview: initialData.thumbnail,
            size: 0
          }
        ]
      : undefined,
    gallery:
      initialData?.gallery?.map((url: string) => ({
        name: url.split('/').pop() || 'gallery',
        preview: url,
        size: 0
      })) ?? undefined,
    isTrending: initialData?.isTrending ?? false,
    isFeatured: initialData?.isFeatured ?? false,
    isBestSeller: initialData?.isBestSeller ?? false,
    isInStock: initialData?.isInStock ?? true,
    trendingStartDate: initialData?.trendingStartDate,
    trendingEndDate: initialData?.trendingEndDate,
    featuredStartDate: initialData?.featuredStartDate,
    featuredEndDate: initialData?.featuredEndDate
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const [loading, startAPICall] = useTransition();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key !== 'thumbnail' && key !== 'gallery') {
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

    if (values.thumbnail && values.thumbnail[0] instanceof File) {
      formData.append('thumbnail', values.thumbnail[0]);
    } else {
      console.error('Thumbnail is not a file');
    }

    if (values.gallery && values.gallery.length > 0) {
      values.gallery.forEach((file: File, index: number) => {
        if (file instanceof File) {
          formData.append(`gallery`, file);
        }
      });
    }

    startAPICall(async () => {
      try {
        const data = await updateProduct({
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
        console.error('Failed to update product. Error:', error);
        toast.error('Something went wrong!');
      }
    });
  };

  // Prepare attribute options for MultiSelect
  const attributeOptions = useMemo(
    () =>
      attributes.map((attr) => ({
        value: attr.id,
        label: `${attr.value}, ${attr.attributeGroup.title}`
      })),
    [attributes]
  );

  const categoryValue = form.watch('category_id');
  const subcategoryValue = form.watch('subcategory_id');

  const filteredSubcategories = useMemo(() => {
    return subcategories.filter(
      (cat) => cat.parentCategory?.id === categoryValue
    );
  }, [categoryValue, subcategories]);

  const filteredBrands = useMemo(() => {
    return brands.filter((brn) =>
      brn.categories?.find((cat) => cat.id === subcategoryValue)
    );
  }, [brands, subcategoryValue]);

  // Reset subcategory and brand when category changes
  useEffect(() => {
    if (categoryValue !== initialData?.category.id) {
      form.resetField('subcategory_id', { defaultValue: null });
      form.resetField('brand_id', { defaultValue: '' });
    } else {
      form.resetField('subcategory_id', {
        defaultValue: initialData.subCategory?.id ?? null
      });
      form.resetField('brand_id', { defaultValue: initialData.brand.id ?? '' });
    }
  }, [categoryValue, form, initialData]);

  // Reset brand when subcategory changes
  useEffect(() => {
    if (subcategoryValue !== initialData?.subCategory?.id) {
      form.resetField('brand_id', { defaultValue: '' });
    } else {
      form.resetField('brand_id', {
        defaultValue: initialData?.brand.id ?? ''
      });
    }
  }, [subcategoryValue, form, initialData]);

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
                  name='thumbnail'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail</FormLabel>
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
                  name='gallery'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gallery Images</FormLabel>
                      <FormControl>
                        <FileUploader
                          disabled={loading}
                          value={field.value}
                          onValueChange={field.onChange}
                          maxFiles={10}
                          maxSize={MAX_FILE_SIZE}
                          multiple
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter product title'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='slug'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter product slug'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='productCode'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Code</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter product code'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='regularPrice'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regular Price</FormLabel>
                      <FormControl>
                        <div className='relative flex'>
                          <Input
                            disabled={loading}
                            type='number'
                            step='0.01'
                            placeholder='Enter regular price'
                            className='pl-10'
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                          <p className='absolute left-2 self-center justify-self-center text-xs lg:text-sm'>
                            BDT
                          </p>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='discountPrice'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Price</FormLabel>
                      <FormControl>
                        <div className='relative flex'>
                          <Input
                            disabled={loading}
                            type='number'
                            step='0.01'
                            placeholder='Enter discount price'
                            className='pl-10'
                            value={field.value ?? ''}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseFloat(e.target.value)
                                  : undefined
                              )
                            }
                          />
                          <p className='absolute left-2 self-center justify-self-center text-xs lg:text-sm'>
                            BDT
                          </p>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='quantity'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          type='number'
                          step='1'
                          placeholder='Enter quantity'
                          value={field.value}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='category_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <LabelledComboBox
                        disabled={loading}
                        className='w-full'
                        label='Select Category'
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        items={categories.map((cat) => ({
                          label: cat.name,
                          value: cat.id
                        }))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='subcategory_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subcategory</FormLabel>
                      <LabelledComboBox
                        key={`Subcategory-${field.value}`}
                        disabled={
                          loading ||
                          !categoryValue ||
                          filteredSubcategories.length < 1
                        }
                        className='w-full'
                        label='Select Subcategory'
                        defaultValue={field.value ?? ''}
                        onValueChange={field.onChange}
                        items={filteredSubcategories.map((cat) => ({
                          label: cat.name,
                          value: cat.id
                        }))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='brand_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <LabelledComboBox
                        key={`Brand-${field.value}`}
                        disabled={
                          loading ||
                          !subcategoryValue ||
                          filteredBrands.length < 1
                        }
                        className='w-full'
                        label='Select Brand'
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        items={filteredBrands.map((brand) => ({
                          label: brand.name,
                          value: brand.id
                        }))}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='thresholdAmount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Threshold Amount</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          type='number'
                          step='1'
                          placeholder='Enter threshold amount'
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseFloat(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <TiptapEditor
                        disabled={loading}
                        output='html'
                        placeholder={{
                          paragraph: 'Enter product description...',
                          imageCaption: 'Type caption for image (optional)'
                        }}
                        initialContent={field.value}
                        onContentChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className='text-lg font-semibold lg:text-xl'>Product Status</p>

              <FormField
                control={form.control}
                name='isInStock'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel>In Stock</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) =>
                          field.onChange(value === 'true')
                        }
                        defaultValue={field.value.toString()}
                        className='flex space-x-4'
                        disabled={loading}
                      >
                        <FormItem className='flex items-center space-x-2'>
                          <FormControl>
                            <RadioGroupItem value='true' />
                          </FormControl>
                          <FormLabel className='font-normal'>Yes</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-2'>
                          <FormControl>
                            <RadioGroupItem value='false' />
                          </FormControl>
                          <FormLabel className='font-normal'>No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name='isBestSeller'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel>Best Seller</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) =>
                          field.onChange(value === 'true')
                        }
                        defaultValue={field.value.toString()}
                        className='flex space-x-4'
                        disabled={loading}
                      >
                        <FormItem className='flex items-center space-x-2'>
                          <FormControl>
                            <RadioGroupItem value='true' />
                          </FormControl>
                          <FormLabel className='font-normal'>Yes</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-2'>
                          <FormControl>
                            <RadioGroupItem value='false' />
                          </FormControl>
                          <FormLabel className='font-normal'>No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='isTrending'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel>Trending</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) =>
                          field.onChange(value === 'true')
                        }
                        defaultValue={field.value.toString()}
                        className='flex space-x-4'
                        disabled={loading}
                      >
                        <FormItem className='flex items-center space-x-2'>
                          <FormControl>
                            <RadioGroupItem value='true' />
                          </FormControl>
                          <FormLabel className='font-normal'>Yes</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-2'>
                          <FormControl>
                            <RadioGroupItem value='false' />
                          </FormControl>
                          <FormLabel className='font-normal'>No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='trendingStartDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trending Start Date</FormLabel>
                      <FormControl>
                        <Input disabled={loading} type='date' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='trendingEndDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trending End Date</FormLabel>
                      <FormControl>
                        <Input disabled={loading} type='date' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='isFeatured'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormLabel>Featured</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) =>
                          field.onChange(value === 'true')
                        }
                        defaultValue={field.value.toString()}
                        className='flex space-x-4'
                        disabled={loading}
                      >
                        <FormItem className='flex items-center space-x-2'>
                          <FormControl>
                            <RadioGroupItem value='true' />
                          </FormControl>
                          <FormLabel className='font-normal'>Yes</FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-2'>
                          <FormControl>
                            <RadioGroupItem value='false' />
                          </FormControl>
                          <FormLabel className='font-normal'>No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='featuredStartDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Start Date</FormLabel>
                      <FormControl>
                        <Input disabled={loading} type='date' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='featuredEndDate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured End Date</FormLabel>
                      <FormControl>
                        <Input disabled={loading} type='date' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <p className='text-lg font-semibold lg:text-xl'>
                Search Engine Optimization (SEO) Options
              </p>
              <FormField
                control={form.control}
                name='metaTitle'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Enter meta title'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='metaDescription'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        placeholder='Enter meta description'
                        className='resize-none'
                        rows={8}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='keyFeatures'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Features</FormLabel>
                    <FormControl>
                      <TiptapEditor
                        disabled={loading}
                        output='html'
                        placeholder={{
                          paragraph: 'Enter product key features...',
                          imageCaption: 'Type caption for image (optional)'
                        }}
                        initialContent={field.value}
                        onContentChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='specifications'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specifications</FormLabel>
                    <FormControl>
                      <TiptapEditor
                        disabled={loading}
                        output='html'
                        placeholder={{
                          paragraph: 'Enter product specifications...',
                          imageCaption: 'Type caption for image (optional)'
                        }}
                        initialContent={field.value}
                        onContentChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='attribute_value_ids'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Attributes</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={attributeOptions}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select product attributes'
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={loading} type='submit'>
                {initialData ? 'Update Product' : 'Add Product'}
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
