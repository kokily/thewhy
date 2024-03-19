import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/helper/server/database';

export async function PATCH(req: NextRequest, { params: { id } }: any) {
  const { password } = (await req.json()) as ModifyQuestionPayload;

  try {
    const question = await db.question.findUnique({ where: { id } });

    if (!question) {
      return NextResponse.json(
        { error: '존재하지 않는 게시글입니다.' },
        { status: 404 },
      );
    }

    if (password && (await bcrypt.compare(password, question.password))) {
      return NextResponse.json(true);
    } else {
      return NextResponse.json(false);
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
