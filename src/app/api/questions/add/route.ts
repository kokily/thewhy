import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/helper/server/database';

export async function POST(req: NextRequest) {
  const data = (await req.json()) as AddQuestionPayload;

  try {
    const question = await db.question.create({
      data: {
        ...data,
        password: await bcrypt.hash(data.password, 10),
      },
    });

    return NextResponse.json(question);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
