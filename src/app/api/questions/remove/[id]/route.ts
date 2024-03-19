import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import db from '@/helper/server/database';

export async function PATCH(req: NextRequest, { params: { id } }: any) {
  const { password } = (await req.json()) as ModifyQuestionPayload;

  try {
    const session = await getServerSession();

    if (!session || !session.user || !session.user.id) {
      // 일반 사용자
      const question = await db.question.findUnique({ where: { id } });

      if (!question) {
        return NextResponse.json(
          { error: '존재하지 않는 게시글입니다.' },
          { status: 404 },
        );
      } else {
        if (password && (await bcrypt.compare(password, question.password))) {
          await db.question.delete({ where: { id } });

          return NextResponse.json({ message: '삭제 완료' });
        } else {
          return NextResponse.json(
            { error: '비밀번호가 틀렸거나 입력되지 않았습니다.' },
            { status: 401 },
          );
        }
      }
    } else {
      // 관리자 로그인 상태
      await db.question.delete({ where: { id } });

      return NextResponse.json({ message: '삭제 완료' });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
