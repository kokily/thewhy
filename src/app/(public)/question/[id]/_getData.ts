import client from '@/helper/client/client';
import { Question } from '@prisma/client';

export async function getData(id: string) {
  const response = await client.get<Question>(`/questions/${id}`);

  if (!response.data) {
    throw new Error('Failed to fetch');
  }

  return response.data;
}
