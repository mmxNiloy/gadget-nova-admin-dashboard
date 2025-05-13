'use client';
import getSession from '@/app/(server)/actions/auth/get-session.controller';
import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useTransition
} from 'react';
import { IUserAuth } from 'types/schema/user.schema';

interface ISessionContextProps {
  session?: IUserAuth;
  isLoading?: boolean;
  error?: string | null;
  refresh?: () => void;
}

export const SessionContext = createContext<ISessionContextProps>({
  session: undefined,
  isLoading: false,
  error: null,
  refresh: undefined
});

export default function SessionProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<IUserAuth | undefined>(undefined);
  const [isLoading, startDataFetch] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const fetchSession = useCallback(() => {
    startDataFetch(async () => {
      try {
        const mSession = await getSession();
        setSession(mSession);
        setError(null);
      } catch (err) {
        setSession(undefined);
        setError('Failed to fetch session');
        console.error('[useSession] Error:', err);
      }
    });
  }, []);

  const refresh = useCallback(() => {
    fetchSession();
  }, [fetchSession]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return (
    <SessionContext.Provider value={{ session, isLoading, error, refresh }}>
      {children}
    </SessionContext.Provider>
  );
}
