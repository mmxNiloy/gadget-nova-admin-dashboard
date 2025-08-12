'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useTransition,
  useMemo,
  useRef
} from 'react';
import hasSessionAction from '@/app/(server)/actions/auth/hasSessionAction.controller';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type RefreshSessionRef = 'sign-out' | 'sign-in' | 'sign-up';

interface AuthContextValue {
  status: AuthStatus;
  hasSession: boolean;
  refreshSession: (ref?: RefreshSessionRef) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
  refetchInterval?: number; // In MS (Default: 5 mins)
}

export function AuthProvider({
  children,
  refetchInterval = 300000
}: AuthProviderProps) {
  const [hasSession, setHasSession] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const [status, setStatus] = useState<AuthStatus>('loading');

  const mountedRef = useRef<boolean>(false);
  const bcRef = useRef<BroadcastChannel | null>(null);

  const router = useRouter();

  const refreshSession = useCallback(() => {
    startTransition(async () => {
      try {
        const result = await hasSessionAction();
        const oldResult = hasSession;
        setHasSession(result);

        if (!result && oldResult) {
          toast.info('You have been signed out. Please sign in again.');
          router.refresh();
        }
      } catch (err) {
        console.error('[AuthProvider] refreshSession error', err);
      }
    });
  }, [hasSession, router]);

  const checkSession = useCallback(() => {
    startTransition(async () => {
      setStatus('loading');

      try {
        const result = await hasSessionAction();

        if (!mountedRef.current) return;

        setHasSession(result);

        setStatus(result ? 'authenticated' : 'unauthenticated');
      } catch (err) {
        console.log('[AuthProvider] checkSession error', err);
        setHasSession(false);
        setStatus('unauthenticated');
      }
    });
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    // Broadcast channel for multi-tab sync
    bcRef.current = new BroadcastChannel('auth');
    bcRef.current.onmessage = (ev) => {
      if (ev.data?.type === 'signout') {
        setHasSession(false);
        setStatus('unauthenticated');
      } else if (ev.data?.type === 'signed-in') {
        // someone signed-in, revalidate
        checkSession();
      }
    };

    return () => {
      mountedRef.current = false;
      bcRef.current?.close();
    };
  }, [checkSession]);

  useEffect(() => {
    checkSession();

    const interval = setInterval(() => {
      refreshSession();
    }, refetchInterval);

    const onFocus = () => refreshSession();
    const onVisibility = () => {
      if (!document.hidden) refreshSession();
    };

    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'auth:signout') {
        // other tab signed out
        setHasSession(false);
        setStatus('unauthenticated');
      }
    };
    window.addEventListener('storage', onStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('storage', onStorage);
    };
  }, [checkSession, refetchInterval, refreshSession]);

  const authStatus: AuthStatus = useMemo(
    () =>
      isLoading ? 'loading' : hasSession ? 'authenticated' : 'unauthenticated',
    [hasSession, isLoading]
  );

  return (
    <AuthContext.Provider
      value={{ status: authStatus, hasSession, refreshSession }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
