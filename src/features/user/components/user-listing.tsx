import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as UserTable } from '@/components/ui/table/data-table';
import getUsers from '@/app/(server)/actions/user/get-users.controller';
import { IUserBase } from 'types/schema/user.schema';
import { columns } from './user-tables/columns';
import { DataTableError } from '@/components/ui/table/data-table-error';

type UserListingPage = {};

export default async function UserListingPage({}: UserListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const userData = await getUsers({ ...filters });

  if (!userData.ok) {
    return <DataTableError errorMessage={userData.error.message} />;
  }

  const data = userData.data;

  const users: IUserBase[] = data.payload;

  return (
    <UserTable
      columns={columns}
      data={users}
      totalItems={users.length}
      pageCount={1}
    />
  );
}
