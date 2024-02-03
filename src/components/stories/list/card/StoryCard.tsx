import type { Story } from '@prisma/client';
import styled from 'styled-components';

import { media, shadow } from '@/helper/client/styles';
import { CardThumbnail } from './CardThumbnail';
import { CardBody } from './CardBody';

interface Props {
  story: Story;
  onReadStory: (id: string) => void;
}

export function StoryCard({ story, onReadStory }: Props) {
  return (
    <CardContainer>
      <CardContents>
        <CardThumbnail story={story} onReadStory={onReadStory} />

        <CardBody story={story} onReadStory={onReadStory} />
      </CardContents>
    </CardContainer>
  );
}

// Styles
const CardContainer = styled.div`
  display: block;
  position: relative;
  width: 100%;
  padding: 5px 5px 0 5px;
  flex: 0 0 25%;
  max-width: 25%;
  user-select: none;

  ${media.large} {
    flex: 0 0 33.33333%;
    max-width: 33.33333%;
  }

  ${media.medium} {
    flex: 1 1 50%;
    max-width: 47.5%;
  }

  ${media.small} {
    flex: none;
    max-width: 95%;
  }
`;

const CardContents = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 0;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.06);
  word-wrap: break-word;
  background: white;
  border-radius: 0.25rem;
`;
