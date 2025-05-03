import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  type UserSession = DefaultSession['user'];
  interface Session {
    user: UserSession;
    accessToken?: string;
    error?: string
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}
