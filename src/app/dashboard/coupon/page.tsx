import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import BrandsListingPage from '@/features/brands/components/brand-listing';
import getCategories from '@/app/(server)/actions/category/get-categories.controller';
import { SiteConfig } from '@/constants/site-config';
import BrandTableAction from '@/features/brands/components/brand-tables/brand-table-action';
import CouponsListingPage from '@/features/coupons/components/coupon-listing';

export const metadata = {
  title: SiteConfig.siteTitle.coupon.list
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function CouponPage(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Coupon' description='Manage Coupons' />
          <Link
            href='/dashboard/coupon/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Link>
        </div>
        <Separator />

        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <CouponsListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
