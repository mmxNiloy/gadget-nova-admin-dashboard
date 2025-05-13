'use client';

import { SessionContext } from '@/components/layout/session-provider';
import { useContext } from 'react';

export default function useSession() {
  const context = useContext(SessionContext);
  if (!context)
    throw new Error(
      'Cannot call useSession hook outside of a session context.'
    );

  return {
    ...context,
    isAuthenticated: !!context.session
  };
}
