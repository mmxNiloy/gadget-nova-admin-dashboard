'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { AuthProvider } from './auth-provider';
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute='class' defaultTheme='light'>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </>
  );
}
