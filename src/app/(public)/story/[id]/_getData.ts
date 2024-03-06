import type { Story } from '@prisma/client';
import client from '@/helper/client/client';

export async function getData(id: string) {
  const response = await client.get<Story>(`/stories/${id}`);

  if (!response.data) {
    throw new Error('Failed to fetch');
  }

  return response.data;
}
