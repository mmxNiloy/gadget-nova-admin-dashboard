'use client';
import { ColumnDef } from '@tanstack/react-table';
import { ICoupon } from 'types/schema/coupon.schema';

export const columns: ColumnDef<ICoupon>[] = [
  {
    accessorKey: 'couponCode',
    header: 'Coupon Code'
  }
  // {
  //   accessorKey: 'category',
  //   header: 'Subcategory',
  //   cell: ({ row }) => (
  //     <BrandCategoryPopover
  //       categories={row.original.categories}
  //       brand={row.original}
  //       filter='all'
  //     />
  //   )
  // },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />
  // }
];
