import { NextRequest, NextResponse } from 'next/server';
import db from '@/helper/server/database';

export async function GET(_: NextRequest, { params: { id } }: any) {
  try {
    const story = await db.story.findUnique({ where: { id } });

    if (story) {
      return NextResponse.json(story);
    } else {
      return NextResponse.json(
        {
          error: '존재하지 않는 게시물입니다.',
        },
        {
          status: 404,
        },
      );
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
