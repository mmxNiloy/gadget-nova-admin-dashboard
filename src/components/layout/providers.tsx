'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import SessionProvider from './session-provider';
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider attribute='class' defaultTheme='light'>
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </>
  );
}
