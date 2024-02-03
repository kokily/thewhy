import type { Story } from '@prisma/client';
import Image from 'next/image';
import styled from 'styled-components';

interface Props {
  story: Story;
  onReadStory: (id: string) => void;
}

export function CardThumbnail({ story, onReadStory }: Props) {
  return (
    <ThumbnailContainer
      src={story.thumbnail}
      alt={story.title}
      onClick={() => onReadStory(story.id)}
      width={265}
      height={265}
      priority
    />
  );
}

// Styles
const ThumbnailContainer = styled(Image)`
  cursor: pointer;
  transition: all 0.2s ease 0s;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
  flex-shrink: 0;
  -ms-flex-shrink: 0;
  width: 100%;
  vertical-align: middle;
  border-style: none;
  filter: grayscale(50%);
  -webkit-filter: grayscale(50%);
  transition: 0.3s all;

  &:hover {
    filter: grayscale(0%);
    -webkit-filter: grayscale(0%);
  }
`;
