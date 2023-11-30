import NextAuth from 'next-auth';
import { authConfigExample } from './auth.config.example';

export default NextAuth(authConfigExample).auth;

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};