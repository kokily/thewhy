import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import db from '@/helper/server/database';

export async function PATCH(req: NextRequest, { params: { id } }: any) {
  const data = (await req.json()) as AddQuestionPayload;
  const { password } = data;

  try {
    const question = await db.question.update({
      where: { id },
      data: {
        ...data,
        password: await bcrypt.hash(password, 10),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(question);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
