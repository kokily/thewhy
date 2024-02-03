import type { ChangeEvent, SyntheticEvent } from 'react';
import styled from 'styled-components';

import { EditorBody } from '@/components/stories/add/editor/EditorBody';
import { EditorFooter } from '@/components/stories/add/editor/EditorFooter';
import { EditorTitle } from '@/components/stories/add/editor/EditorTitle';
import { shadow } from '@/helper/client/styles';

interface Props {
  title: string;
  body: string;
  onBack: () => void;
  onChangeTitle: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeBody: (text: string) => void;
  onSubmitNotice: (e: SyntheticEvent) => void;
}

export function AddNotice(props: Props) {
  return (
    <NoticeContainer>
      <EditorBox>
        <Wrapper>
          <EditorTitle
            placeholder="제목을 입력하세요"
            value={props.title}
            onChange={props.onChangeTitle}
          />

          <EditorBody body={props.body} onChangeBody={props.onChangeBody} />
        </Wrapper>

        <EditorFooter onBack={props.onBack} onSubmit={props.onSubmitNotice} />
      </EditorBox>
    </NoticeContainer>
  );
}

// Styles
const NoticeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  animation: fadeIn 0.5s forwards;

  padding-right: 1rem;

  ${shadow(1)}
`;

const EditorBox = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Wrapper = styled.div`
  padding-top: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;
