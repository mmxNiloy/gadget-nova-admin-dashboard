'use client';

import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { useQueryState } from 'nuqs';
import { searchParams } from '@/lib/searchparams';

export default function CategoryTableAction() {
  const [nameQuery, setNameQuery] = useQueryState(
    'name',
    searchParams.name.withDefault('').withOptions({
      shallow: false,
      throttleMs: 1000
    })
  );

  const [_, setPage] = useQueryState('page', searchParams.page.withDefault(1));

  return (
    <DataTableSearch
      searchKey='name'
      searchQuery={nameQuery}
      setSearchQuery={setNameQuery}
      setPage={setPage}
    />
  );
}
