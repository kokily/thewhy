import { NextRequest, NextResponse } from 'next/server';
import db from '@/helper/server/database';

export async function PATCH(req: NextRequest, { params: { id } }: any) {
  const data = (await req.json()) as AddStoryPayload;

  try {
    const story = await db.story.findUnique({ where: { id } });

    if (story) {
      await db.story.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json(story);
    } else {
      return NextResponse.json(
        { error: '게시글이 없습니다.' },
        { status: 404 },
      );
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
