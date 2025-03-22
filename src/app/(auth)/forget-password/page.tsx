'use server';
import { Metadata } from 'next';
import { SiteConfig } from '@/constants/site-config';
import { Button } from '@/components/ui/button';
import Icons from '@/components/ui/icons';
import Image from 'next/image';
import LoginForm from '@/features/auth/components/login-form';
import ForgetPasswordForm from '@/features/auth/components/forget-password-form';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: SiteConfig.siteTitle.forgetPassword,
    description: SiteConfig.siteDescription.forgetPassword
  };
}

export default async function ForgetPasswordPage() {
  return (
    <main className='h-screen bg-gradient-to-br from-orange-550/50 to-orange-600/80'>
      {/* Auth container here */}
      <section className='container flex h-full flex-col items-center justify-center'>
        <div className='flex max-w-screen-md flex-col items-center justify-center gap-4 rounded-lg bg-background p-8 drop-shadow-lg'>
          {/* <p className='text-h4 font-semibold'>Welcome Back</p> */}
          <Image
            src={'/site-logo.svg'}
            height={0}
            width={0}
            alt='Gadget Nova'
            className='w-32'
          />
          <p className='text-h6 font-semibold'>Forget Password</p>

          {/* Forget Password form */}
          <ForgetPasswordForm />

          <Link href='/' passHref>
            <Button variant={'link'} className='gap-1 text-primary-foreground'>
              <Icons.chevronLeft />
              Back
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
