'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { IProduct } from 'types/schema/product.shema';
import TextCapsule from '@/components/text-capsule';
import { cn } from '@/lib/utils';
import { CurrencySymbols } from '@/constants/currency-symbol';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'thumbnail',
    header: 'Image',
    cell: ({ row }) => (
      <Avatar className='h-12 w-12 rounded-lg'>
        <AvatarImage
          src={row.original.thumbnail}
          alt={row.original.title}
          className='object-contain'
        />
        <AvatarFallback>
          <Skeleton className='h-12 w-12 rounded-lg' />
        </AvatarFallback>
      </Avatar>
    )
  },
  {
    accessorKey: 'title',
    header: 'Product',
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className='text-start'>
            <div className='max-w-48'>
              <p className='line-clamp-1 font-medium'>{row.original.title}</p>
              <p className='text-xs text-gray-500'>
                {row.original.productCode}
              </p>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.original.title}</p>
            <p className='text-xs'>Code: {row.original.productCode}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => (
      <div className='max-w-32'>
        <p className='line-clamp-1'>{row.original.category.name}</p>
        {row.original.subCategory && (
          <p className='line-clamp-1 text-xs text-gray-500'>
            {row.original.subCategory.name}
          </p>
        )}
      </div>
    )
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
    cell: ({ row }) => row.original.brand.name
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => (
      <div className='text-nowrap'>
        <p>
          <CurrencySymbols.default /> {row.original.regularPrice}
        </p>
        {row.original.discountPrice && (
          <p className='text-xs text-green-600'>
            <CurrencySymbols.default /> {row.original.discountPrice}
          </p>
        )}
      </div>
    )
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => (
      <div className='text-center'>
        <p>{row.original.stockAmount}</p>
        <p className='text-xs text-gray-500'>Hold: {row.original.holdAmount}</p>
      </div>
    )
  },
  {
    accessorKey: 'isInStock',
    header: 'Status',
    cell: ({ row }) => (
      <TextCapsule
        className={cn(
          'text-nowrap bg-red-500 text-white',
          row.original.isInStock && 'bg-green-500'
        )}
      >
        {row.original.isInStock ? 'In Stock' : 'Out of Stock'}
      </TextCapsule>
    )
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => (
      <div className='flex flex-wrap gap-1'>
        {row.original.isFeatured && (
          <Badge variant='secondary' className='bg-purple-100 text-purple-800'>
            Featured
          </Badge>
        )}
        {row.original.isTrending && (
          <Badge
            variant='secondary'
            className='bg-fuchsia-100 text-fuchsia-800'
          >
            Trending
          </Badge>
        )}
        {row.original.isBestSeller && (
          <Badge variant='secondary' className='bg-yellow-100 text-yellow-800'>
            Best Seller
          </Badge>
        )}
      </div>
    )
  },
  {
    accessorKey: 'soldAmount',
    header: 'Sold',
    cell: ({ row }) => row.original.soldAmount
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
