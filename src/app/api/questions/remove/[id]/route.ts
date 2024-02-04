import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';

import db from '@/helper/server/database';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function PATCH(req: NextRequest, { params: { id } }: any) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      // 일반 작성자
      const question = await db.question.findUnique({ where: { id } });
      const { password } = (await req.json()) as RemoveQuestionPayload;

      if (!question) {
        throw new Error('잘못된 요청입니다.');
      }

      const valid = await bcrypt.compare(password!, question.password);

      if (!valid) {
        throw new Error('비밀번호가 틀렸습니다.');
      }

      await db.question.delete({ where: { id } });

      return NextResponse.json({ message: '삭제 완료' });
    } else {
      // 관리자
      await db.question.delete({ where: { id } });

      return NextResponse.json({ message: '삭제 완료' });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
