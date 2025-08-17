import React, { useCallback, useState, useTransition } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger
} from '../ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Icons } from '../icons';
import { toast } from 'sonner';
import clearRedis from '@/app/(server)/actions/redis/clear-redis.controller';
import { useRouter } from 'next/navigation';

export default function RedisClearAlert() {
  const router = useRouter();
  const [loading, startAction] = useTransition();
  const [open, setOpen] = useState<boolean>(false);
  const onSubmit = useCallback(() => {
    startAction(async () => {
      try {
        const res = await clearRedis();

        console.log('Redis response', res);

        if (!res.ok) {
          toast.error(`Cache Clear Failed! Cause: ${res.error.message}`);
          return;
        }

        toast.success('Cache Clear Successful!');
        setOpen(false);
        router.refresh();
      } catch (err) {
        toast.error('Something went wrong!');
        console.log('Redis Clear Error', err);
      }
    });
  }, [router]);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' className='w-full justify-start px-3'>
          <Icons.redis className='mr-2 size-4' />
          Clear Cache
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          Are you sure you want to clear the cache?
        </AlertDialogHeader>
        <AlertDialogDescription>
          This action will <strong>clear all cached</strong> data made by the
          server. This may <strong>decrease performance</strong>. This may have{' '}
          <strong>unintended consequences</strong>. This may{' '}
          <strong>nottemporarily fix some issues</strong> due to bad data in the
          cache. This action is <strong>irreversible</strong>. Do you want to
          proceed?
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button
              disabled={loading}
              onClick={onSubmit}
              variant={'destructive'}
              className='gap-1 bg-red-300 text-white hover:bg-red-300/90 hover:text-white'
            >
              <Trash2 />
              <span>Clear Cache</span>
            </Button>
          </AlertDialogAction>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
