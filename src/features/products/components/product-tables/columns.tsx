'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { IProduct } from 'types/schema/product.shema';
import TextCapsule from '@/components/text-capsule';
import { cn } from '@/lib/utils';
import { CurrencySymbols } from '@/constants/currency-symbol';

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'thumbnail',
    header: 'Image',
    cell: ({ row }) => {
      return (
        <div className='relative aspect-square'>
          <img
            src={row.original.thumbnail}
            alt={row.original.title}
            // fill
            className='size-16 rounded-lg bg-muted/20 object-contain object-center'
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'metaTitle',
    header: 'Name'
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
