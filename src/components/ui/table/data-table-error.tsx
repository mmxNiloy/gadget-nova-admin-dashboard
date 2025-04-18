'use client';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useCallback, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Icons from '../icons';

export function DataTableError({
  errorMessage = 'Failed to load data'
}: {
  errorMessage?: string;
}) {
  const [loading, startRetry] = useTransition();
  const router = useRouter();

  const onRetry = useCallback(() => {
    startRetry(() => {
      router.refresh();
    });
  }, [router]);

  return (
    <div className='flex flex-1 flex-col space-y-3 overflow-auto'>
      <div className='relative flex flex-1 rounded-md border'>
        <div className='absolute bottom-0 left-0 right-0 top-0 flex'>
          <div className='flex flex-grow flex-col items-center justify-center gap-4'>
            <AlertCircle className='size-12 text-red-500 sm:size-16 md:size-20 lg:size-24' />
            <h2 className='text-lg font-semibold text-red-500'>
              {errorMessage}
            </h2>
            <Button
              disabled={loading}
              variant='outline'
              onClick={onRetry}
              className='mt-2 gap-2'
            >
              {loading ? (
                <Icons.spinner className='size-4 animate-spin' />
              ) : (
                <Icons.reset className='size-4' />
              )}{' '}
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
