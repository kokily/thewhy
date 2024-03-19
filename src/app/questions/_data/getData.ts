import type { Question } from '@prisma/client';

import client from '@/helper/client/api/client';

// Server Side
export async function getData(id: String): Promise<Question> {
  const response = await client.get(`/questions/${id}`);

  if (!response.data) {
    throw new Error('Failed to fetch data');
  }

  return response.data;
}
