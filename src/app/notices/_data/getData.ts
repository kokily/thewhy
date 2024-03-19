import type { Notice } from '@prisma/client';

import client from '@/helper/client/api/client';

// Server Side
export async function getData(id: string): Promise<Notice> {
  const response = await client.get(`/notices/${id}`);

  if (!response.data) {
    throw new Error('Failed to fetch data');
  }

  return response.data;
}
