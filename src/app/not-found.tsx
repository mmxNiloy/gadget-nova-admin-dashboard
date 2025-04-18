import { Button } from '@/components/ui/button';
import { NotFoundVector, SiteConfig } from '@/constants/site-config';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: SiteConfig.siteTitle.notFound
};

export default function NotFoundPage() {
  return (
    <main className='container flex h-screen flex-grow flex-col items-center justify-center gap-6'>
      <NotFoundVector className='w-full max-w-xs' />
      <p className='text-center text-lg font-semibold md:text-h5 lg:text-h3'>
        Oops! Page not found.
      </p>
      <p className='text-center text-sm text-gray-500 md:text-base'>
        The requested page or document is currently unavailable.
        <br />
        Please try again later.
      </p>

      <Link className='w-fit' href={'/'} passHref>
        <Button className='h-11 rounded-full bg-orange-550 text-white hover:bg-orange-500 hover:text-white'>
          Back to Home
        </Button>
      </Link>
    </main>
  );
}
