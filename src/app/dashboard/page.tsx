import { SiteConfig } from '@/constants/site-config';
import { redirect } from 'next/navigation';
import getSession from '../(server)/actions/auth/get-session.controller';

export default async function Dashboard() {
  const session = await getSession();

  if (!session && !SiteConfig.featureFlags.disableAuth) {
    return redirect('/?session-error=true');
  } else {
    redirect('/dashboard/overview');
  }
}
