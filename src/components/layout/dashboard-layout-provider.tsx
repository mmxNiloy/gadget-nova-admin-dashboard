'use server';

import React from 'react';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import { cookies } from 'next/headers';
import getMyProfile from '@/app/(server)/actions/auth/get-my-profile.controller';
import AppSidebar from './app-sidebar';
import Header from './header';

export default async function DashboardLayoutProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [cookieStore, user] = await Promise.all([cookies(), getMyProfile()]);

  const defaultOpen =
    (cookieStore.get('sidebar:state')?.value ?? 'true') === 'true';
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar user={user} />
      <SidebarInset>
        <Header />
        {/* page main content */}
        {children}
        {/* page main content ends */}
      </SidebarInset>
    </SidebarProvider>
  );
}
