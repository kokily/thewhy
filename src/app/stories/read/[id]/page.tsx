import type { Story } from '@prisma/client';
import type { Metadata } from 'next';

import client from '@/helper/client/api/client';
import { ReadStory } from '@/components/stories/read/ReadStory';

// Server Side
export async function getData(id: string): Promise<Story> {
  const response = await client.get(`/stories/${id}`);

  if (!response.data) {
    throw new Error('Failed to fetch data');
  }

  return response.data;
}

// Metadata
export async function generateMetadata({
  params,
}: {
  params: { id: any };
}): Promise<Metadata> {
  const story = await getData(params.id);

  return {
    title: `${story.title} - 더와이컨설팅`,
    description: story.body.substring(0, 120).replace(/<[^>]*>?/g, ''),
    keywords: story.tags.toString(),
    openGraph: {
      images: [story.thumbnail],
    },
  };
}

export default async function ReadStoryPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const story = await getData(id);

  return <ReadStory id={id} story={story} />;
}
