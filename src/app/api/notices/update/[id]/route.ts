import { NextRequest, NextResponse } from 'next/server';
import db from '@/helper/server/database';
import { checkAuth } from '@/helper/server/utils';

export async function PATCH(req: NextRequest, { params: { id } }: any) {
  const payload = (await req.json()) as AddNoticePayload;

  try {
    await checkAuth();

    const notice = await db.notice.update({
      where: { id },
      data: {
        ...payload,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(notice);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
