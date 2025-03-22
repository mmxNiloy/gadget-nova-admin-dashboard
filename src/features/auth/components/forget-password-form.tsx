'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useCallback, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '@/components/ui/input-otp';

const FormSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    otp: z.string().length(6, { message: 'OTP must be 6 characters' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type FormType = z.infer<typeof FormSchema>;

export default function ForgetPasswordForm() {
  const [activeTab, setActiveTab] = useState('email');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      otp: '',
      password: '',
      confirmPassword: ''
    }
  });

  const handleEmailSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const fd = new FormData(e.currentTarget);

      const email = fd.get('email') as string;

      setIsLoading(true);
      try {
        toast.success('OTP sent to your email');
        setActiveTab('otp'); // Automatic tab switch
      } catch (error) {
        toast.error('Failed to send OTP');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleOtpSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setIsLoading(true);
      try {
        toast.success('OTP verified');
        setActiveTab('password'); // Automatic tab switch
      } catch (error) {
        toast.error('Invalid OTP');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const onSubmit = useCallback(
    async (data: FormType) => {
      if (
        form.formState.errors.confirmPassword ||
        form.formState.errors.password
      )
        return;

      setIsLoading(true);
      try {
        toast.success('Password reset successfully');
        router.push('/'); // Final redirect
      } catch (error) {
        toast.error('Failed to reset password');
      } finally {
        setIsLoading(false);
      }
    },
    [
      form.formState.errors.confirmPassword,
      form.formState.errors.password,
      router
    ]
  );

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
      <TabsList className='grid w-full grid-cols-3'>
        <TabsTrigger value='email'>Email</TabsTrigger>
        <TabsTrigger value='otp' disabled={!form.getValues('email')}>
          OTP
        </TabsTrigger>
        <TabsTrigger value='password' disabled={!form.getValues('otp')}>
          New Password
        </TabsTrigger>
      </TabsList>

      <Form {...form}>
        {/* Tab 1: Email */}
        <TabsContent value='email'>
          <form onSubmit={handleEmailSubmit} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      disabled={isLoading}
                      placeholder='Enter your email'
                      type='email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              disabled={isLoading}
              className='w-full bg-orange-550 text-white hover:bg-orange-500'
            >
              {isLoading ? 'Sending...' : 'Send OTP'}
            </Button>
          </form>
        </TabsContent>

        {/* Tab 2: OTP */}
        <TabsContent value='otp'>
          <form onSubmit={handleOtpSubmit} className='space-y-4'>
            <FormField
              control={form.control}
              name='otp'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <InputOTP
                      autoFocus
                      disabled={isLoading}
                      value={field.value}
                      onChange={field.onChange}
                      maxLength={6}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              disabled={isLoading}
              className='w-full bg-orange-550 text-white hover:bg-orange-500'
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </form>
        </TabsContent>

        {/* Tab 3: New Password */}
        <TabsContent value='password'>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      disabled={isLoading}
                      placeholder='Enter new password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      disabled={isLoading}
                      placeholder='Confirm new password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              disabled={isLoading}
              className='w-full bg-orange-550 text-white hover:bg-orange-500'
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        </TabsContent>
      </Form>
    </Tabs>
  );
}
