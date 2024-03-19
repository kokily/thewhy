import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/helper/server/utils';
import db from '@/helper/server/database';

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as AddNoticePayload;

  try {
    await checkAuth();

    const noticeCount = await db.notice.count();
    const notice = await db.notice.create({
      data: {
        ...payload,
        num: noticeCount + 1,
      },
    });

    return NextResponse.json(notice);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
