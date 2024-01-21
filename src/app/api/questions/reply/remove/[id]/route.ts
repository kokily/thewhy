import { NextRequest, NextResponse } from 'next/server';
import db from '@/helper/server/database';

export async function DELETE(_: NextRequest, { params: { id } }: any) {
  try {
    const question = await db.question.update({
      where: { id },
      data: {
        reply: undefined,
      },
    });

    return NextResponse.json(question);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
