import { NextRequest, NextResponse } from 'next/server';
import db from '@/helper/server/database';

export async function GET(_: NextRequest, { params: { id } }: any) {
  try {
    const question = await db.question.findUnique({ where: { id } });

    if (question) {
      return NextResponse.json(question);
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
