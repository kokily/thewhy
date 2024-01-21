import { NextRequest } from 'next/server';

// Query String
export function getQuery(req: NextRequest, queryName: string) {
  const url = new URL(req.nextUrl);
  return url.searchParams.get(queryName) ?? '';
}
