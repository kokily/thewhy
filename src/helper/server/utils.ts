import type { NextAuthOptions } from 'next-auth';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import db from './database';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        password: {
          type: 'password',
          label: 'password',
        },
      },
      async authorize(credentials, _) {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: credentials?.password,
          }),
        });

        const data = await response.json();

        if (data) {
          return data;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: '/thewhy',
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

// Query String
export function getQuery(req: NextRequest, queryName: string) {
  const url = new URL(req.nextUrl);
  return url.searchParams.get(queryName) ?? '';
}

// Check Auth
export async function checkAuth() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    throw new Error('사용자 로그인 후 사용하세요');
  }

  const user = await db.user.findFirst();

  if (!user) {
    throw new Error('관리자 생성 후 사용하세요');
  }

  return true;
}
