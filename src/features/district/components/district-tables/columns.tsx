'use client';
import { ColumnDef } from '@tanstack/react-table';
import { IDistrict } from 'types/schema/order.schema';
import { CurrencySymbols } from '@/constants/currency-symbol';
import CellAction from './cell-action';

export const columns: ColumnDef<IDistrict>[] = [
  {
    accessorKey: 'name',
    header: 'District'
  },
  {
    accessorKey: 'delivery_charge',
    header: 'Delivery Charge',
    cell: ({ row }) => (
      <span>
        <CurrencySymbols.default /> {row.original.delivery_charge}
      </span>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <CellAction
        key={`${row.original.id}-${row.original.delivery_charge}`}
        data={row.original}
      />
    )
  }
];
