import { NextRequest, NextResponse } from 'next/server';

import db from '@/helper/server/database';
import { getQuery } from '@/helper/server/utils';

export async function GET(req: NextRequest) {
  const title = getQuery(req, 'title');
  const cursor = getQuery(req, 'cursor');

  const cursorObj = cursor === '' ? undefined : { id: cursor };
  const limit = 40;

  try {
    const notices = await db.notice.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      cursor: cursorObj,
      skip: cursor !== '' ? 1 : 0,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(notices);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
