import type { Metadata } from 'next';

import { ReadStory } from '@/components/stories/read/ReadStory';
import { getData } from '../../_data/getData';

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
