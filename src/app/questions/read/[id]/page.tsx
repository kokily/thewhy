import type { Question } from '@prisma/client';

import { ReadQuestion } from '@/components/questions/read/ReadQuestion';
import client from '@/helper/client/api/client';

// Server Side
export async function getData(id: String): Promise<Question> {
  const response = await client.get(`/questions/${id}`);

  if (!response.data) {
    throw new Error('Failed to fetch data');
  }

  return response.data;
}

// Metadata
export async function generateMetadata({ params }: { params: { id: any } }) {
  const question = await getData(params.id);

  return {
    title: `${question.title} - 더와이 컨설팅`,
    description: question.body.substring(0, 120),
  };
}

export default async function ReadQuestionPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <ReadQuestion id={id} />;
}
