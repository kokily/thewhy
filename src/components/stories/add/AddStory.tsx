import styled from 'styled-components';
import { EditorTitle } from '@/components/common/editor/EditorTitle';
import dynamic from 'next/dynamic';
import { EditorFooter } from '@/components/common/editor/EditorFooter';
import { TagBox } from './TagBox';
import { useTags } from '@/helper/client/hooks/useTags';
import { ThumbnailBox } from './ThumbnailBox';

const EditorBody = dynamic(() => import('./../../common/editor/EditorBody'), {
  ssr: false,
});

interface Props {
  id?: string;
  story: StoryType;
}

export function AddStory({ id, story }: Props) {
  const { input, localTags, onRemoveTag, onChangeText, onSetTags } = useTags({
    tags: story.tags,
    onChangeTags: story.onChangeTags,
  });

  return (
    <StoryContainer>
      <EditorBox>
        <Contents>
          <EditorTitle
            placeholder="제목을 입력하세요"
            value={story.title}
            onChange={story.onChangeTitle}
          />

          <TagsBox>
            <TagBox
              input={input}
              localTags={localTags}
              onRemoveTag={onRemoveTag}
              onChangeText={onChangeText}
              onSetTags={onSetTags}
            />
          </TagsBox>

          <ThumbnailContainer>
            <ThumbnailBox
              thumbnail={story.thumbnail}
              onUploadThumbnail={story.onUploadThumbnail}
            />
          </ThumbnailContainer>

          <EditorBody body={story.body} onChangeBody={story.onChangeBody} />
        </Contents>

        <EditorFooter
          $edit={!!id}
          onBack={story.onBack}
          onSubmit={story.onSubmitStory}
        />
      </EditorBox>
    </StoryContainer>
  );
}

// Styles
const StoryContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  animation: fadeIn 0.5s forwards;
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
  margin-top: 2.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
`;

const ThumbnailContainer = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto;
  margin-bottom: 2.2rem;
`;
