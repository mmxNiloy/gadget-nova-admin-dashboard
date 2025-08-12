'use client';

import signOutAction from '@/app/(server)/actions/auth/sign-out-action.controller';
import { useAuth } from '@/components/layout/auth-provider';
import { Button, ButtonProps } from '@/components/ui/button';
import Icons from '@/components/ui/icons';
import { useRouter } from 'next/navigation';
import React, { useCallback, useTransition } from 'react';
import { toast } from 'sonner';

interface ILogoutButtonProps extends ButtonProps {
  onSuccess?: () => void;
}

export default function LogoutButton({
  onSuccess,
  variant = 'destructive',
  className,
  ...props
}: ILogoutButtonProps) {
  const [loading, startSignOut] = useTransition();
  const router = useRouter();

  const { refreshSession } = useAuth();

  const handleSignOut = useCallback(() => {
    startSignOut(async () => {
      const [backendResult, _] = await signOutAction();

      refreshSession('sign-out');

      console.log('backendResult', backendResult);

      if (backendResult.ok) {
        toast.success('Sign-out successful!');

        // Start the toploader and refresh RSCs
        router.refresh();

        if (onSuccess) onSuccess();
      }
    });
  }, [onSuccess, refreshSession, router]);
  return (
    <Button
      {...props}
      onClick={handleSignOut}
      disabled={loading}
      variant={variant}
      className={className}
    >
      {loading ? <Icons.spinner className='animate-spin' /> : <Icons.logout />}
      Log-out
    </Button>
  );
}
