import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/helper/server/database';
import { serializeQuestion } from '@/helper/client/utils';

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as AddQuestionPayload;
  const { password, ...payloadWithoutPassword } = payload;

  try {
    const question = await db.question.create({
      data: {
        ...payloadWithoutPassword,
        password: await bcrypt.hash(password, 10),
      },
    });

    return NextResponse.json(serializeQuestion(question));
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
