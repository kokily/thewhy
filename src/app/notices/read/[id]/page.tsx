import type { Notice } from '@prisma/client';

import client from '@/helper/client/api/client';
import { ReadNotice } from '@/components/notices/read/ReadNotice';

// Server Side
export async function getData(id: string): Promise<Notice> {
  const response = await client.get(`/notices/${id}`);

  if (!response.data) {
    throw new Error('Failed to fetch data');
  }

  return response.data;
}

// Metadata
export async function generateMetadata({ params }: { params: { id: any } }) {
  const notice = await getData(params.id);

  return {
    title: `${notice.title} - 더와이 컨설팅`,
    description: notice.body.substring(0, 120),
  };
}

export default async function ReadNoticePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const notice = await getData(id);

  return <ReadNotice id={id} notice={notice} />;
}
