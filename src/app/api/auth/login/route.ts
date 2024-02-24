import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/helper/server/database';
import { signJwtAccessToken } from '@/helper/client/tokens';

export async function POST(req: NextRequest) {
  const { password } = (await req.json()) as AuthPayload;

  try {
    const user = await db.user.findFirst();

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...userWithoutPassword } = user;
      const token = signJwtAccessToken(userWithoutPassword);
      const result = {
        ...userWithoutPassword,
        token,
      };

      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { error: '관리자가 없거나 비밀번호가 틀렸습니다.' },
        { status: 401 },
      );
    }

    return NextResponse.json({ message: 'ok' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
