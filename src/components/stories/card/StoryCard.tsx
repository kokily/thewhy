import type { Story } from '@prisma/client';
import Image from 'next/image';
import styled from 'styled-components';
import { media } from '@/helper/client/style';
import { CardHeader } from './CardHeader';
import { CardBody } from './CardBody';
import { CardTags } from './CardTags';

interface Props {
  story: Story;
  onReadStory: (id: string) => void;
}

export function StoryCard({ story, onReadStory }: Props) {
  return (
    <CardContainer>
      <Contents>
        <Thumbnail
          src={story.thumbnail}
          alt={story.title}
          onClick={() => onReadStory(story.id)}
          width={265}
          height={265}
          priority={true}
        />

        <Layout>
          <CardHeader story={story} onReadStory={onReadStory} />
          <CardBody story={story} />
          <CardTags tags={story.tags} />
        </Layout>
      </Contents>
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

const Contents = styled.div`
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

const Thumbnail = styled(Image)`
  cursor: pointer;
  transition: all 0.2s ease 0s;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
  flex-shrink: 0;
  -ms-flex-shrink: 0;
  width: 100%;
  vertical-align: middle;
  border-style: none;

  &:hover {
    filter: grayscale(80%);
    -webkit-filter: grayscale(80%);
  }
`;

const Layout = styled.div`
  flex: 1 1 auto;
  min-height: 1px;
  padding: 2rem 0.2rem 0 0.2rem;
`;
