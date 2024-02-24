import { NextRequest, NextResponse } from 'next/server';
import db from '@/helper/server/database';

export async function GET(_: NextRequest, { params: { id } }: any) {
  try {
    const question = await db.question.findUnique({ where: { id } });

    if (!question) {
      return NextResponse.json(
        { error: '존재하지 않는 게시글입니다.' },
        { status: 404 },
      );
    }

    return NextResponse.json(question);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
