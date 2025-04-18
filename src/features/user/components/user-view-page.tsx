import { notFound } from 'next/navigation';
import { IUserResponse } from 'types/schema/user.schema';
import getUser from '@/app/(server)/actions/user/get-user.controller';
import UserForm from './user-form';

interface IUserViewPageProps {
  userId: string;
}

export default async function UserViewPage({ userId }: IUserViewPageProps) {
  let user: IUserResponse | undefined;
  let pageTitle = 'Create New User';

  if (userId !== 'new') {
    const data = await getUser(userId);
    // product = data.product as Product;
    if (!data.ok) {
      console.error('[UserViewPage] Failed to get user >', data.error);
      notFound();
    }

    pageTitle = `Edit User`;
    user = data.data;
  }

  return <UserForm initialData={user?.payload} pageTitle={pageTitle} />;
}
