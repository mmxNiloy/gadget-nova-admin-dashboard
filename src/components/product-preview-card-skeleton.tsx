import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface IProductPreviewCardSkeletonProps {
  className?: string;
}

export default function ProductPreviewCardSkeleton({
  className
}: IProductPreviewCardSkeletonProps) {
  return (
    <div className={cn('flex gap-1 px-2 py-1 md:gap-2', className)}>
      {/* Avatar Skeleton */}
      <Skeleton className='size-16 rounded-sm' />

      {/* Content Skeleton */}
      <div className='flex w-full flex-col gap-1'>
        {/* Title */}
        <Skeleton className='h-3 w-3/4 rounded-sm' />

        {/* Price and Discount */}
        <div className='flex items-center gap-2'>
          <Skeleton className='h-3 w-16 rounded-sm' />
          <Skeleton className='h-3 w-12 rounded-sm' />
        </div>

        {/* Badges */}
        <div className='flex items-center gap-2'>
          <Skeleton className='h-3 w-16 rounded-full' />
          <Skeleton className='h-3 w-20 rounded-full' />
        </div>
      </div>
    </div>
  );
}
