import { NextRequest, NextResponse } from 'next/server';
import db from '@/helper/server/database';

export async function POST(req: NextRequest) {
  const data = (await req.json()) as AddStoryPayload;

  try {
    const story = await db.story.create({ data });

    return NextResponse.json(story);
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
