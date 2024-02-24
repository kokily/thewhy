import { NextRequest, NextResponse } from 'next/server';
import db from '@/helper/server/database';
import { checkAuth } from '@/helper/server/utils';

export async function PATCH(req: NextRequest, { params: { id } }: any) {
  const payload = (await req.json()) as AddStoryPayload;

  try {
    await checkAuth();

    const story = await db.story.update({
      where: { id },
      data: {
        ...payload,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(story);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
