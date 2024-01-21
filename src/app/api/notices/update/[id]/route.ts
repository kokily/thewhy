import { NextRequest, NextResponse } from 'next/server';
import db from '@/helper/server/database';

export async function PATCH(req: NextRequest, { params: { id } }: any) {
  const data = (await req.json()) as AddNoticePayload;

  try {
    const notice = await db.notice.findUnique({ where: { id: parseInt(id) } });

    if (notice) {
      await db.notice.update({
        where: { id: parseInt(id) },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(notice);
    } else {
      return NextResponse.json(
        { error: '게시글이 없습니다.' },
        { status: 404 },
      );
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
