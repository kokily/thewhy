import { NextRequest, NextResponse } from 'next/server';
import db from '@/helper/server/database';
import { checkAuth } from '@/helper/server/utils';

export async function POST(req: NextRequest, { params: { id } }: any) {
  const { reply } = (await req.json()) as AddReplyPayload;

  try {
    await checkAuth();

    const question = await db.question.update({
      where: { id },
      data: {
        reply,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(question);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
