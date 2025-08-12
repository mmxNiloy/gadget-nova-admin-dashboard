import KBar from '@/components/kbar';
import DashboardLayoutProvider from '@/components/layout/dashboard-layout-provider';
import { Suspense } from 'react';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <KBar>
      <Suspense fallback={null}>
        <DashboardLayoutProvider>{children}</DashboardLayoutProvider>
      </Suspense>
    </KBar>
  );
}
