import { NextRequest, NextResponse } from 'next/server';
import db from '@/helper/server/database';
import { checkAuth } from '@/helper/server/utils';

export async function DELETE(_: NextRequest, { params: { id } }: any) {
  try {
    await checkAuth();
    await db.notice.delete({ where: { id } });

    return NextResponse.json({ message: '삭제 완료' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
