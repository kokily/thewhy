import type { Story } from '@prisma/client';
import type {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
} from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';

import { media } from '@/helper/client/styles';
import { Search } from '../../common/Search';
import { StoryCard } from './card/StoryCard';

interface Props {
  isMobile: boolean;
  isAdmin: boolean;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
  stories: Array<Story>;
  onReadStory: (id: string) => void;
  setTarget: Dispatch<SetStateAction<HTMLElement | null | undefined>>;
}

export function ListStories(props: Props) {
  return (
    <StoriesContainer>
      <StoriesHeader>
        <StoriesSearchBox logged={props.isAdmin} small={props.isMobile}>
          {!props.isMobile && props.isAdmin && (
            <Link href="/stories/add">
              <StoriesButton>글 작성</StoriesButton>
            </Link>
          )}

          <Search
            mode="제목"
            search={props.search}
            onChange={props.onChange}
            onSearch={props.onSearch}
          />
        </StoriesSearchBox>
      </StoriesHeader>

      {props.stories.length > 0 &&
        props.stories.map((story) => (
          <StoryCard
            key={story.id}
            story={story}
            onReadStory={props.onReadStory}
          />
        ))}
    </StoriesContainer>
  );
}

// Styles
const StoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StoriesHeader = styled.div`
  width: 100%;

  ${media.large} {
    max-width: 760px;
  }
`;

const StoriesButton = styled.button`
  height: 40px;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1rem 0.6rem 1rem;
  background: white;
  color: #db3603;
  border: 2px solid #db3603;
  border-radius: 14px;
  cursor: pointer;
  transition: 0.2s all;

  &:hover {
    background: #db3603;
    color: white;
  }
`;

const StoriesSearchBox = styled.div<{ small: boolean; logged: boolean }>`
  display: flex;
  width: 100%;
  justify-content: space-between;

  ${(props) =>
    props.small === true &&
    css`
      justify-content: flex-end;
    `}

  ${(props) =>
    !props.logged &&
    css`
      justify-content: flex-end;
    `}
`;
