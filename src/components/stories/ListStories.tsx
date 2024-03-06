import type { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useMobile } from '@/helper/client/hooks/useInfinite';
import { media } from '@/helper/client/style';
import { Story } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { Search } from '../common/Search';
import { StoryCard } from './card/StoryCard';

interface Props {
  stories: Array<Story>;
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
  onReadStory: (id: string) => void;
  setTarget: Dispatch<SetStateAction<HTMLElement | null | undefined>>;
}

export function ListStories(props: Props) {
  const stories = props.stories;
  const { data } = useSession();
  const isMobile = useMobile();

  return (
    <StoriesContainer>
      <StoryHeader>
        <SearchBox small={isMobile} logged={!!data?.user}>
          {!isMobile && !!data?.user && (
            <Link href="/stories/add">
              <Button>글 작성</Button>
            </Link>
          )}

          <Search
            mode="제목"
            search={props.search}
            onChange={props.onChange}
            onSearch={props.onSearch}
          />
        </SearchBox>
      </StoryHeader>

      {stories.map((story) => (
        <StoryCard story={story} onReadStory={props.onReadStory} />
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

const StoryHeader = styled.div`
  width: 100%;

  ${media.large} {
    max-width: 760px;
  }
`;

const Button = styled.button`
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

const SearchBox = styled.div<{ small: boolean; logged: boolean }>`
  display: flex;
  width: 100%;
  justify-content: space-between;

  ${(props) =>
    props.small &&
    `justify-content: flex-end;
    `}

  ${(props) =>
    !props.logged &&
    `justify-content: flex-end;
    `}
`;
