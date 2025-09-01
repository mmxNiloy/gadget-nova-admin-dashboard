'use client';
import React, { useCallback, useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CurrencySymbols } from '@/constants/currency-symbol';
import { Badge } from './ui/badge';
import { IProduct } from 'types/schema/product.shema';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

interface IProductPreviewCardProps {
  data: IProduct;
  onClick?: (productId: string) => void;
  onRemove?: (productId: string) => void;
  size?: 'sm' | 'default';
  disabled?: boolean;
}

export default function ProductPreviewCard({
  data,
  size = 'default',
  onClick,
  onRemove,
  disabled
}: IProductPreviewCardProps) {
  const priceData = useMemo(() => {
    const price = Number.parseFloat(data.regularPrice);
    const discountPrice = Number.parseFloat(data.discountPrice || '0');
    const discountAmount = price - discountPrice;

    const hasDiscount = data.discountPrice ? true : false;
    const discountPercentage = Math.floor(
      (discountAmount / Math.max(1, price)) * 100
    );

    const isAvailable = (discountPrice ?? price) > 0;
    return {
      price,
      discountPrice,
      hasDiscount,
      discountAmount,
      discountPercentage,
      isAvailable
    };
  }, [data.discountPrice, data.regularPrice]);

  const handleSelect = useCallback(() => {
    if (onClick && !disabled) {
      onClick(data.id);
    }
  }, [data.id, disabled, onClick]);

  const handleRemove = useCallback(() => {
    if (onRemove && !disabled) {
      onRemove(data.id);
    }
  }, [data.id, onRemove, disabled]);

  return (
    <div
      onClick={handleSelect}
      title={size !== 'sm' ? data.title : undefined}
      className={cn(
        'flex grow cursor-pointer gap-1 overflow-clip rounded-md px-2 py-1 hover:bg-muted md:gap-2',
        size === 'sm' &&
          'px-1 py-0.5 hover:cursor-default hover:bg-transparent md:gap-1'
      )}
    >
      {/* Avatar */}
      <Avatar
        className={cn(
          'size-16 items-center rounded-sm p-0.5 ring-1 ring-muted md:size-20',
          size === 'sm' && 'size-10 md:size-10'
        )}
      >
        <AvatarImage
          className='rounded-sm bg-muted object-contain object-center'
          src={data.thumbnail}
        />
        <AvatarFallback>
          <Skeleton className='size-full rounded-sm' />
        </AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className='flex w-full flex-col gap-1'>
        <div className='flex w-full gap-1'>
          <p
            className={cn(
              'line-clamp-3 grow overflow-clip text-ellipsis text-xs font-semibold text-gray-900 md:text-sm',
              size === 'sm' && 'line-clamp-1 md:text-xs'
            )}
          >
            {data.title}
          </p>
          {size === 'sm' && (
            <Trash2
              onClick={handleRemove}
              className={cn(
                'size-7 shrink-0 cursor-pointer rounded-sm p-1 text-red-400 hover:bg-muted/40 hover:text-red-400/90',
                disabled && 'cursor-not-allowed opacity-50'
              )}
            />
          )}
        </div>

        {size === 'default' && (
          <>
            {/* Price and discount */}
            {priceData.isAvailable && (
              <div className='flex items-center gap-2'>
                <span className='text-xs font-semibold text-orange-550 sm:text-sm md:text-base'>
                  <CurrencySymbols.default />{' '}
                  {Number.parseFloat(
                    data.discountPrice || data.regularPrice
                  ).toFixed(2)}
                </span>
                {priceData.hasDiscount && (
                  <span className='text-xs text-gray-500 line-through'>
                    <CurrencySymbols.default />{' '}
                    {Number.parseFloat(data.regularPrice).toFixed(2)}
                  </span>
                )}
              </div>
            )}

            <div className='flex items-center gap-2 text-xs md:text-sm'>
              {priceData.hasDiscount && priceData.discountPercentage > 0 && (
                <Badge className='bg-orange-550 text-[0.625rem] font-normal text-white hover:bg-orange-500'>
                  {priceData.discountPercentage}% OFF
                </Badge>
              )}
              {(!priceData.isAvailable || !data.isInStock) && (
                <Badge
                  className={
                    'bg-red-500 text-[0.625rem] font-normal text-white hover:bg-red-400'
                  }
                >
                  Out of Stock
                </Badge>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
