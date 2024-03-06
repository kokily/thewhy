'use client';

import { AddStory } from '@/components/stories/add/AddStory';
import { useStory } from '@/helper/client/hooks/useStory';

export default function UpdateStoryPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const story = useStory({ id });

  return <AddStory id={id} story={story} />;
}
