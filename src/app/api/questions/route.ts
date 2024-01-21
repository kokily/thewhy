import { NextRequest, NextResponse } from 'next/server';
import db from '@/helper/server/database';
import { getQuery } from '@/helper/server/utils';

export async function GET(req: NextRequest) {
  try {
    const title = getQuery(req, 'title');
    const username = getQuery(req, 'username');
    const email = getQuery(req, 'email');
    const phone = getQuery(req, 'phone');
    const cursor = getQuery(req, 'cursor');
    const cursorObj = cursor === '' ? undefined : { id: cursor };
    const limit = 40;

    const questions = await db.question.findMany({
      where: {
        title: {
          contains: title,
        },
        username: {
          contains: username,
        },
        email: {
          contains: email,
        },
        phone: {
          contains: phone,
        },
      },
      cursor: cursorObj,
      skip: cursor !== '' ? 1 : 0,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(questions);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
