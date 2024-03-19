import { NextRequest, NextResponse } from 'next/server';
import db from '@/helper/server/database';
import { checkAuth } from '@/helper/server/utils';

export async function POST(req: NextRequest) {
  const payload = (await req.json()) as AddStoryPayload;

  try {
    await checkAuth();

    const story = await db.story.create({
      data: {
        ...payload,
      },
    });

    return NextResponse.json(story);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
