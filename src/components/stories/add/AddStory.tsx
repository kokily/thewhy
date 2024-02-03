import type { ChangeEvent, SyntheticEvent } from 'react';
import styled from 'styled-components';

import { useTags } from '@/app/stories/_hooks/useTags';
import { TagBox } from './TagBox';
import { Thumbnail } from './Thumbnail';
import { EditorTitle } from './editor/EditorTitle';
import { EditorFooter } from './editor/EditorFooter';
import { EditorBody } from './editor/EditorBody';

interface Props {
  title: string;
  body: string;
  thumbnail: string;
  tags: Array<string>;
  onBack: () => void;
  onChangeTitle: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeBody: (text: string) => void;
  onChangeTags: (nextTags: Array<string>) => void;
  onUploadThumbnail: () => void;
  onAddStory: (e: SyntheticEvent) => void;
}

export function AddStory(props: Props) {
  const tagHooks = useTags({
    tags: props.tags,
    onChangeTags: props.onChangeTags,
  });

  return (
    <AddStoryContainer>
      <EditorBox>
        <Contents>
          <EditorTitle
            placeholder="제목을 입력하세요"
            value={props.title}
            onChange={props.onChangeTitle}
          />

          <TagsBox>
            <TagBox
              input={tagHooks.input}
              localTags={tagHooks.localTags}
              onChangeText={tagHooks.onChangeText}
              onRemoveTag={tagHooks.onRemoveTag}
              onSetTags={tagHooks.onSetTags}
            />
          </TagsBox>

          <ThumbnailBox>
            <Thumbnail
              thumbnail={props.thumbnail}
              onUploadThumbnail={props.onUploadThumbnail}
            />
          </ThumbnailBox>

          <EditorBody body={props.body} onChangeBody={props.onChangeBody} />
        </Contents>

        <EditorFooter onBack={props.onBack} onSubmit={props.onAddStory} />
      </EditorBox>
    </AddStoryContainer>
  );
}

// Styles
const AddStoryContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  animation: fadeIn 0.5s forwards;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`;

const EditorBox = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Contents = styled.div`
  padding-top: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;

const TagsBox = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #7494bb;
  border-radius: 4px;
`;

const ThumbnailBox = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  margin-bottom: 2.2rem;
`;
