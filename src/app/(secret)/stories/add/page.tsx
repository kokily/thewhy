'use client';

import { AddStory } from '@/components/stories/add/AddStory';
import { useStory } from '@/helper/client/hooks/useStory';

export default function AddStoryPage() {
  const story = useStory({});

  return <AddStory story={story} />;
}
