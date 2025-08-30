'use server';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import DistrictListingPage from '@/features/district/components/district-listing';
import DistrictTableAction from '@/features/district/components/district-tables/district-table-action';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs';
import React, { Suspense } from 'react';

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function AllDistrictsPage({ searchParams }: Props) {
  const sParams = await searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(sParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...sParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Districts' description='Manage Delivery Districts' />
          {/* <Link
            href='/dashboard/district/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Link> */}
        </div>
        <Separator />
        <DistrictTableAction />
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <DistrictListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
