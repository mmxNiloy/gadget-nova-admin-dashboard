import { SiteConfig } from '@/constants/site-config';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: SiteConfig.siteTitle.dashboard,
  description: SiteConfig.siteDescription.default
};

export default function DashboardPage() {
  console.log('DashboardPage');
  return <div>DashboardPage</div>;
}
