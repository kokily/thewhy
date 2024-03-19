import type { Story } from '@prisma/client';

import client from '@/helper/client/api/client';

// Server Side
export async function getData(id: string): Promise<Story> {
  const response = await client.get(`/stories/${id}`);

  if (!response.data) {
    throw new Error('Failed to fetch data');
  }

  return response.data;
}
