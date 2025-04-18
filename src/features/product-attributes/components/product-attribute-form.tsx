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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  IAttributeGroup,
  IAttributeValue,
  IProductAttribute
} from 'types/schema/product.shema';
import updateProductAttributeGroup from '@/app/(server)/actions/attribute/group/update-product-attribute-group.controller';
import updateProductAttributeValue from '@/app/(server)/actions/attribute/value/update-product-attribute-value.controller';
import Link from 'next/link';
import { LabelledComboBox } from '@/components/ui/combobox';

// Zod schemas
const attributeGroupSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' })
});

const attributeValueSchema = z.object({
  value: z.string().min(1, { message: 'Value is required.' }),
  attributeGroup_id: z.string().min(1, { message: 'Group is required.' })
});

const productAttributeSchema = z.object({
  attributeValue_id: z
    .string()
    .min(1, { message: 'Attribute value is required.' })
});

interface ProductAttributeFormProps {
  groups: IAttributeGroup[];
  values: IAttributeValue[];
  initialData?: IProductAttribute;
  pageTitle: string;
}

export default function ProductAttributeForm({
  groups,
  values,
  pageTitle,
  initialData
}: ProductAttributeFormProps) {
  const router = useRouter();
  const [loading, startAPICall] = useTransition();
  const [selectedGroupId, setSelectedGroupId] = useState<string>(
    initialData?.attributeValue.attributeGroup.id || ''
  );
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);
  const [isValueDialogOpen, setIsValueDialogOpen] = useState(false);

  // Main form
  const form = useForm<z.infer<typeof productAttributeSchema>>({
    resolver: zodResolver(productAttributeSchema),
    defaultValues: {
      attributeValue_id: initialData?.attributeValue.id || ''
    }
  });

  // Attribute Group form
  const groupForm = useForm<z.infer<typeof attributeGroupSchema>>({
    resolver: zodResolver(attributeGroupSchema),
    defaultValues: { title: '' }
  });

  // Attribute Value form
  const valueForm = useForm<z.infer<typeof attributeValueSchema>>({
    resolver: zodResolver(attributeValueSchema),
    defaultValues: {
      value: '',
      attributeGroup_id: selectedGroupId
    }
  });

  const filteredValues = values.filter(
    (v) => v.attributeGroup.id === selectedGroupId
  );

  const onGroupSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent bubbling to parent form

      const values = {
        title: groupForm.getValues('title')
      };

      startAPICall(async () => {
        const data = await updateProductAttributeGroup({
          data: values,
          method: 'POST'
        });
        if (data.ok) {
          toast.success('Attribute Group Created!');
          setIsGroupDialogOpen(false);
          setSelectedGroupId('');
          groupForm.reset();
          router.refresh();
        } else {
          toast.error(`Group Creation Failed! Cause: ${data.error.message}`);
        }
      });
    },
    [groupForm, router]
  );

  const onValueSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent bubbling to parent form

      const values: z.infer<typeof attributeValueSchema> = {
        value: valueForm.getValues('value'),
        attributeGroup_id: valueForm.getValues('attributeGroup_id')
      };

      startAPICall(async () => {
        const data = await updateProductAttributeValue({
          data: values,
          method: 'POST'
        });
        if (data.ok) {
          toast.success('Attribute Value Created!');
          setSelectedGroupId('');
          setIsValueDialogOpen(false);
          valueForm.reset();
          router.refresh();
        } else {
          toast.error(`Value Creation Failed! Cause: ${data.error.message}`);
        }
      });
    },
    [router, valueForm]
  );

  // Update valueForm's attributeGroup_id when selectedGroupId changes
  useEffect(() => {
    valueForm.setValue('attributeGroup_id', selectedGroupId);
  }, [selectedGroupId, valueForm]);

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className='flex flex-col gap-8'>
            <div className='space-y-4'>
              {/* Attribute Group Selection */}
              <div className='flex items-end gap-4'>
                <FormItem className='flex-1'>
                  <FormLabel>Attribute Group</FormLabel>

                  <LabelledComboBox
                    key={selectedGroupId}
                    disabled={loading}
                    className='w-full'
                    label='Select an attribute group'
                    defaultValue={selectedGroupId}
                    onValueChange={setSelectedGroupId}
                    items={groups.map((grp) => ({
                      label: grp.title,
                      value: grp.id
                    }))}
                  />
                </FormItem>
                <Dialog
                  open={isGroupDialogOpen}
                  onOpenChange={setIsGroupDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant='outline' disabled={loading}>
                      Create Group
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Attribute Group</DialogTitle>
                    </DialogHeader>
                    <Form {...groupForm}>
                      <form onSubmit={onGroupSubmit} className='space-y-4'>
                        <FormField
                          control={groupForm.control}
                          name='title'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Enter group title'
                                  disabled={loading}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type='submit' disabled={loading}>
                          {loading ? 'Creating...' : 'Create'}
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Attribute Value Selection */}
              <div className='flex items-end gap-4'>
                <FormField
                  control={form.control}
                  name='attributeValue_id'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Attribute Values</FormLabel>

                      <LabelledComboBox
                        className='w-full'
                        label='Select an attribute group'
                        items={filteredValues.map((val) => ({
                          label: val.value,
                          value: val.id
                        }))}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={
                          loading ||
                          !selectedGroupId ||
                          selectedGroupId.length < 1
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Dialog
                  open={isValueDialogOpen}
                  onOpenChange={setIsValueDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant='outline'
                      disabled={loading || !selectedGroupId}
                    >
                      Create Value
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Attribute Value</DialogTitle>
                    </DialogHeader>
                    <Form {...valueForm}>
                      <form onSubmit={onValueSubmit} className='space-y-4'>
                        <FormField
                          control={valueForm.control}
                          name='value'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Value</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder='Enter attribute value'
                                  disabled={loading}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <input
                          type='hidden'
                          {...valueForm.register('attributeGroup_id')}
                          value={selectedGroupId}
                        />
                        <Button type='submit' disabled={loading}>
                          {loading ? 'Creating...' : 'Create'}
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Link
              href='/dashboard/product-attribute'
              passHref
              className='w-fit'
            >
              <Button type='submit' disabled={loading}>
                {loading ? 'Saving...' : 'Done'}
              </Button>
            </Link>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
