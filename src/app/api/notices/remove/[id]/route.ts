import { NextRequest, NextResponse } from 'next/server';
import db from '@/helper/server/database';

export async function DELETE(_: NextRequest, { params: { id } }: any) {
  try {
    const notice = await db.notice.findUnique({ where: { id: parseInt(id) } });

    if (notice) {
      await db.notice.delete({ where: { id: parseInt(id) } });

      return NextResponse.json({ message: '삭제 완료' });
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
