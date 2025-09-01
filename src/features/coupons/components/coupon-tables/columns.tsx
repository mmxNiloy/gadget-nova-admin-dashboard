'use client';
import { ColumnDef } from '@tanstack/react-table';
import { ICoupon } from 'types/schema/coupon.schema';

export const columns: ColumnDef<ICoupon>[] = [
  {
    accessorKey: 'couponCode',
    header: 'Coupon Code'
  }
];
