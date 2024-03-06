import { ReadStory } from '@/components/story/ReadStory';
import { getData } from './_getData';

// Metadata
export async function generateMetadata({ params }: { params: { id: any } }) {
  const story = await getData(params.id);

  return {
    title: `${story.title} - 더와이 컨설팅`,
    description: story.body.substring(0, 120),
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
