import { DefaultSession } from 'next-auth';

// Extend the JWT interface for token properties
declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    error?: 'RefreshTokenError';
  }
}

// Extend the Session and User interfaces for next-auth
declare module 'next-auth' {
  // Extend the User type for the user object returned by providers
  interface User {
    accessToken: string;
    refreshToken?: string;
    expiresAt: number;
  }

  // Extend the Session type
  interface Session {
    user: DefaultSession['user']; // Keep default user properties
    accessToken?: string; // Optional: if you want accessToken at the root level
    error?: string;
    token: {
      access_token: string;
      expires_at: number;
      refresh_token?: string;
      error?: 'RefreshTokenError';
    };
  }

  // Optional: Define CredentialsInputs for type safety in credentials provider
  interface CredentialsInputs {
    email: string;
    password: string;
  }
}
