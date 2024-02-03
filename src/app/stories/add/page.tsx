'use client';

import { AddStory } from '@/components/stories/add/AddStory';
import { useStory } from '../_hooks/useStory';

export default function AddStoryPage() {
  const {
    title,
    body,
    thumbnail,
    tags,
    onBack,
    onChangeTitle,
    onChangeBody,
    onChangeTags,
    onUploadThumbnail,
    onSubmitStory,
  } = useStory({});

  return (
    <AddStory
      title={title}
      body={body}
      thumbnail={thumbnail}
      tags={tags}
      onBack={onBack}
      onChangeTitle={onChangeTitle}
      onChangeBody={onChangeBody}
      onChangeTags={onChangeTags}
      onUploadThumbnail={onUploadThumbnail}
      onAddStory={onSubmitStory}
    />
  );
}
