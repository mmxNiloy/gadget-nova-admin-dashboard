// File: features/categories/components/category-form.tsx
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
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ICategory } from 'types/schema/product.shema';
import updateCategory from '@/app/(server)/actions/category/update-category.controller';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import FormErrorAlertDialog from '@/components/form-error-alert-dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import SlugSchema from 'types/slug.schema';

// Zod schema for UpdateCategoryDto
const categorySchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  slug: SlugSchema,
  isFeatured: z.boolean().default(false),
  parent_category_id: z.string({
    message: 'A subcategory must have a parent category.'
  }),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional()
});

interface SubcategoryFormProps {
  initialData?: ICategory;
  categories?: ICategory[];
  pageTitle: string;
}

export default function SubcategoryForm({
  initialData,
  categories,
  pageTitle
}: SubcategoryFormProps) {
  const [open, setOpen] = useState<boolean>(false);

  const defaultValues = {
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    isFeatured: initialData?.isFeatured ?? false,
    parent_category_id: initialData?.parentCategory?.id ?? '',
    metaTitle: initialData?.metaTitle ?? '',
    metaDescription: initialData?.metaDescription ?? ''
  };

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues
  });

  const router = useRouter();
  const [loading, startAPICall] = useTransition();

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    startAPICall(async () => {
      const data = await updateCategory({
        data: values,
        method: initialData ? 'PATCH' : 'POST',
        id: initialData?.id
      });
      if (data.ok) {
        toast.success('Subcategory Update Successful!');
        router.push('/dashboard/sub-category'); // Redirect to categories list
      } else {
        toast.error(`Subcategory Update Failed! Cause: ${data.error.message}`);
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
                          placeholder='Enter subcategory name'
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
                          placeholder='Enter subcategory slug'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='parent_category_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categories</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value ?? undefined}
                          onValueChange={field.onChange}
                          disabled={loading}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select a parent category' />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Select a category</SelectLabel>
                              {categories?.map((cat) => (
                                <SelectItem value={cat.id} key={cat.id}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='isFeatured'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is Featured?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          disabled={loading}
                          value={field.value ? 'yes' : 'no'}
                          onValueChange={(val) => {
                            if (val === 'yes') field.onChange(true);
                            else field.onChange(false);
                          }}
                        >
                          <div className='flex flex-col gap-2'>
                            <div className='flex gap-2'>
                              <RadioGroupItem
                                value='yes'
                                id='is-featured-yes-radio'
                              />
                              <Label htmlFor='is-featured-yes-radio'>Yes</Label>
                            </div>

                            <div className='flex gap-2'>
                              <RadioGroupItem
                                value='no'
                                id='is-featured-no-radio'
                              />
                              <Label htmlFor='is-featured-no-radio'>No</Label>
                            </div>
                          </div>
                        </RadioGroup>
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

              <Button disabled={loading} type='submit'>
                {initialData ? 'Update Subcategory' : 'Create Subcategory'}
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
