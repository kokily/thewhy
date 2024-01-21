import { NextRequest, NextResponse } from 'next/server';
import db from '@/helper/server/database';

export async function POST(req: NextRequest) {
  const data = (await req.json()) as AddNoticePayload;

  try {
    const notice = await db.notice.create({ data });

    return NextResponse.json(notice);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
