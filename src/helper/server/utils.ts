import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from './authOptions';
import db from './database';

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
