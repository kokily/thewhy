import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import db from '@/helper/server/database';

export async function POST(req: NextRequest, { params: { id } }: any) {
  const { password } = (await req.json()) as { password: string };

  try {
    const question = await db.question.findUnique({ where: { id } });

    if (!question) {
      return NextResponse.json(
        { error: '해당 게시글이 존재하지 않습니다.' },
        {
          status: 404,
        },
      );
    }

    const valid = await bcrypt.compare(password, question.password);

    if (!valid) {
      throw new Error('비밀번호가 틀립니다.');
    }

    return NextResponse.json(true);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
