'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { IProduct } from 'types/schema/product.shema';
import TextCapsule from '@/components/text-capsule';
import { cn } from '@/lib/utils';
import { CurrencySymbols } from '@/constants/currency-symbol';
import { AvatarPicker } from '@/components/ui/avatar-picker';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'thumbnail',
    header: 'Image',
    cell: ({ row }) => {
      return (
        <AvatarPicker
          src={row.original.thumbnail}
          alt={row.original.title}
          skeleton={<Skeleton className='size-full' />}
          variant='square'
          readOnly
          className='size-16 rounded-lg bg-muted/20 object-contain object-center p-0.5'
        />
      );
    }
  },
  {
    accessorKey: 'title',
    header: 'Name',
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className='text-start'>
            <p className='line-clamp-2 max-w-64 overflow-clip text-ellipsis'>
              {row.original.title}
            </p>
          </TooltipTrigger>

          <TooltipContent>{row.original.title}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  },
  {
    accessorKey: 'productCode',
    header: 'Product Code'
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
        {row.original.isInStock ? 'In-stock' : 'Out-of-stock'}
      </TextCapsule>
    )
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => row.original.category.name
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
    cell: ({ row }) => row.original.brand.name
  },
  {
    accessorKey: 'regularPrice',
    header: () => <p className='text-nowrap'>Regular Price</p>,
    cell: ({ row }) => (
      <p className='text-nowrap'>
        <CurrencySymbols.default /> {row.original.regularPrice}
      </p>
    )
  },
  {
    accessorKey: 'discountPrice',
    header: () => <p className='text-nowrap'>Discount Price</p>,
    cell: ({ row }) =>
      row.original.discountPrice ? (
        <p className='text-nowrap'>
          <CurrencySymbols.default /> {row.original.discountPrice}
        </p>
      ) : (
        'N/A'
      )
  },
  // {
  //   accessorKey: 'isFeatured',
  //   header: 'Featured?',
  //   cell: ({ row }) => (
  //     <TextCapsule
  //       className={row.original.isFeatured ? 'bg-purple-500 text-white' : ''}
  //     >
  //       {row.original.isFeatured ? 'Featured' : 'N/A'}
  //     </TextCapsule>
  //   )
  // },
  // {
  //   accessorKey: 'featuredStartDate',
  //   header: () => <p className='text-nowrap'>Featured Start Date</p>,
  //   cell: ({ row }) =>
  //     new Date(row.original.featuredStartDate).toLocaleDateString('en-GB')
  // },
  // {
  //   accessorKey: 'featuredEndDate',
  //   header: () => <p className='text-nowrap'>Featured End Date</p>,

  //   cell: ({ row }) =>
  //     new Date(row.original.featuredStartDate).toLocaleDateString('en-GB')
  // },
  // {
  //   accessorKey: 'isTrending',
  //   header: 'Trending?',
  //   cell: ({ row }) => (
  //     <TextCapsule
  //       className={row.original.isFeatured ? 'bg-fuchsia-500 text-white' : ''}
  //     >
  //       {row.original.isTrending ? 'Trending' : 'N/A'}
  //     </TextCapsule>
  //   )
  // },
  // {
  //   accessorKey: 'trendingStartDate',
  //   header: () => <p className='text-nowrap'>Trending Start Date</p>,
  //   cell: ({ row }) =>
  //     new Date(row.original.trendingStartDate).toLocaleDateString('en-GB')
  // },
  // {
  //   accessorKey: 'trendingEndDate',
  //   header: () => <p className='text-nowrap'>Trending End Date</p>,

  //   cell: ({ row }) =>
  //     new Date(row.original.trendingEndDate).toLocaleDateString('en-GB')
  // },
  {
    accessorKey: 'stockAmount',
    header: 'Stock'
  },
  {
    accessorKey: 'holdAmount',
    header: 'Hold'
  },
  {
    accessorKey: 'soldAmount',
    header: 'Sold'
  },
  {
    accessorKey: 'thresholdAMount',
    header: 'Threshold'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
