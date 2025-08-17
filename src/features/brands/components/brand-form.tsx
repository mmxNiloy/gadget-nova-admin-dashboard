// File: features/brands/components/brand-form.tsx
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
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition
} from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { IBrand, ICategory } from 'types/schema/product.shema';
import { MultiSelect } from '@/components/ui/multi-select';
import updateBrand from '@/app/(server)/actions/brand/update-brand.controller';
import FormErrorAlertDialog from '@/components/form-error-alert-dialog';
import SlugSchema from 'types/slug.schema';
import formatSlug from '@/lib/util/format-slug.util';

// Zod schema for UpdateBrandDto
const brandSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  slug: SlugSchema,
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  category_ids: z.array(z.string()).optional(),
  main_categories: z.z
    .array(z.string())
    .min(1, 'Please select at least one category')
    .default([])
});

interface BrandFormProps {
  initialData?: IBrand;
  categories: ICategory[];
  subCategories: ICategory[];
  pageTitle: string;
}

type FormType = z.infer<typeof brandSchema>;

export default function BrandForm({
  initialData,
  categories,
  subCategories,
  pageTitle
}: BrandFormProps) {
  const [open, setOpen] = useState<boolean>(false);

  const defaultValues: FormType = {
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    metaTitle: initialData?.metaTitle ?? '',
    metaDescription: initialData?.metaDescription ?? '',
    category_ids:
      initialData?.categories
        ?.filter((cat) => !!subCategories.find((mCat) => mCat.id === cat.id))
        .map((item) => item.id) ?? [],
    main_categories:
      initialData?.categories
        ?.filter((cat) => !!categories.find((mCat) => mCat.id === cat.id))
        .map((item) => item.id) ?? []
  };

  const [loading, startAPICall] = useTransition();
  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    defaultValues,
    disabled: loading
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof brandSchema>) => {
    startAPICall(async () => {
      const {
        name,
        slug,
        metaTitle,
        metaDescription,
        category_ids,
        main_categories
      } = values;
      const data = await updateBrand({
        data: {
          name,
          slug: formatSlug(slug, true),
          metaTitle,
          metaDescription,
          category_ids,
          main_categories
        },
        method: initialData ? 'PATCH' : 'POST',
        id: initialData?.id
      });
      if (data.ok) {
        toast.success('Brand Update Successful!');
        router.push('/dashboard/brand'); // Redirect to brands list
      } else {
        toast.error(`Brand Update Failed! Cause: ${data.error.message}`);
      }
    });
  };

  const categoryValues = form.watch('main_categories');

  const filteredSubcategories = useMemo(() => {
    return subCategories.filter(
      (cat) => !!categoryValues?.find((mCat) => mCat === cat.parentCategory?.id)
    );
  }, [categoryValues, subCategories]);

  useEffect(() => {
    if (categoryValues) {
      form.resetField('category_ids', { defaultValue: undefined });
    }
  }, [categoryValues, form]);

  const handleSlugChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, cb: (val: string) => void) => {
      const slug = e.target.value;
      cb(formatSlug(slug));
    },
    []
  );

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
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='Enter brand name'
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
                        <div className='flex flex-row gap-2'>
                          <Input
                            disabled={loading}
                            placeholder='Enter brand slug'
                            value={field.value}
                            onChange={(e) =>
                              handleSlugChange(e, field.onChange)
                            }
                          />

                          <Button
                            size='sm'
                            type='button'
                            onClick={() =>
                              field.onChange(formatSlug(field.value, true))
                            }
                          >
                            Format
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='main_categories'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='category_ids'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategories</FormLabel>
                    <FormControl>
                      <MultiSelect
                        key={field.value?.join('.') ?? ''}
                        disabled={
                          loading ||
                          !categoryValues ||
                          filteredSubcategories.length < 1
                        }
                        options={
                          filteredSubcategories?.map((cat) => ({
                            label: cat.name,
                            value: cat.id
                          })) ?? []
                        }
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select categories'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <Button disabled={loading} type='submit'>
                {initialData ? 'Update Brand' : 'Create Brand'}
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
