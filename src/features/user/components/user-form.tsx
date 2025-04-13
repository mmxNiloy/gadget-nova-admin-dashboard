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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { EUserRole, UserRoleValues } from 'types/enum/user-role.enum';
import { IUserBase } from 'types/schema/user.schema';
import updateUser from '@/app/(server)/actions/user/update-user.controller';
import { PasswordInput } from '@/components/ui/password-input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toCapCase } from '@/lib/utils';
import FormErrorAlertDialog from '@/components/form-error-alert-dialog';

const userSchema = z
  .object({
    name: z
      .string()
      .refine((val) => val.trim().length > 0, 'Name cannot be empty'),
    email: z.string().email(),
    password: z
      .string()
      .min(8, 'Password must be 8-32 characters')
      .max(32, 'Password cannot exceed 32 characters'),
    confirm_password: z
      .string()
      .min(8, 'Password must be 8-32 characters')
      .max(32, 'Password cannot exceed 32 characters'),
    role: z.enum(UserRoleValues),
    is_active: z.number().min(0).max(1).default(1)
  })
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password']
  });

interface IUserFormProps {
  initialData?: IUserBase;
  pageTitle: string;
}

export default function UserForm({ initialData, pageTitle }: IUserFormProps) {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      password: '',
      email: initialData?.email ?? '',
      role: initialData?.role ?? EUserRole.USER,
      is_active: initialData?.is_active ?? 1
    }
  });

  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const [loading, startAPICall] = useTransition();

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    startAPICall(async () => {
      try {
        const data = await updateUser({
          data: values,
          method: initialData ? 'PATCH' : 'POST',
          id: initialData?.id
        });
        if (data.ok) {
          toast.success('Update Successful!');
          router.push('.');
        } else {
          toast.error('Update Failed!');
        }
      } catch (error) {
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
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='John Doe'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder='example@email.com'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          disabled={loading}
                          placeholder='Password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='confirm_password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          disabled={loading}
                          placeholder='Password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(val) => field.onChange(val)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select a role' />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Select a role</SelectLabel>
                              {UserRoleValues.map((role) => (
                                <SelectItem value={role} key={role}>
                                  {toCapCase(role.replace(/[^a-zA-Z0-9]/, ' '))}
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
                  name='is_active'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Status</FormLabel>
                      <FormControl>
                        <RadioGroup
                          className='flex items-center gap-4'
                          value={field.value.toString()}
                          onValueChange={(val) =>
                            field.onChange(Number.parseInt(val))
                          }
                        >
                          <div className='flex items-center gap-1'>
                            <RadioGroupItem value='1' />
                            <p>Active</p>
                          </div>
                          <div className='flex items-center gap-1'>
                            <RadioGroupItem value='0' />
                            <p>Inctive</p>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button disabled={loading} type='submit'>
                {initialData ? 'Update User' : 'Create User'}
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
