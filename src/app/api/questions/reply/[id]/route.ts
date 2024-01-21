import { NextRequest, NextResponse } from 'next/server';
import db from '@/helper/server/database';

export async function PATCH(req: NextRequest, { params: { id } }: any) {
  const data = (await req.json()) as AddReplyPayload;

  try {
    const question = await db.question.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(question);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
