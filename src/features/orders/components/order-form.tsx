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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { MultiSelect } from '@/components/ui/multi-select';
import { LabelledComboBox } from '@/components/ui/combobox';
import { IOrder } from 'types/schema/order.schema';

// Zod schema for UpdateBrandDto
const orderSchema = z.object({
  cartIds: z.array(z.string()),
  userId: z.string()
});

interface OrderFormProps {
  initialData?: IOrder;
  pageTitle: string;
}

export default function OrderForm({ initialData, pageTitle }: OrderFormProps) {
  const defaultValues = {
    userId: initialData?.user.id ?? '',
    cartIds: []
  };

  const form = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues
  });

  const router = useRouter();
  const [loading, startAPICall] = useTransition();

  const onSubmit = async (values: z.infer<typeof orderSchema>) => {
    startAPICall(async () => {
      //   const data = await updateBrand({
      //     data: values,
      //     method: initialData ? 'PATCH' : 'POST',
      //     id: initialData?.id
      //   });
      //   if (data.ok) {
      //     toast.success('Brand Update Successful!');
      //     router.push('/dashboard/brand'); // Redirect to brands list
      //   } else {
      //     toast.error('Brand Update Failed!');
      //   }
    });
  };

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='userId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer</FormLabel>
                    <FormControl>
                      <LabelledComboBox
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={loading}
                        items={[]}
                        label='Select a customer'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='cartIds'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cart IDs</FormLabel>
                    <FormControl>
                      <MultiSelect
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={loading}
                        placeholder='Select Cart IDs'
                        options={[]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={loading} type='submit'>
              {initialData ? 'Update Order' : 'Create Order'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
