import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { EditorFooter } from '@/components/common/editor/EditorFooter';
import { EditorTitle } from '@/components/common/editor/EditorTitle';
import { shadow } from '@/helper/client/style';

const EditorBody = dynamic(() => import('../../common/editor/EditorBody'), {
  ssr: false,
});

interface Props {
  id?: string;
  notice: NoticeType;
}

export function AddNotice({ id, notice }: Props) {
  return (
    <NoticeContainer>
      <EditorBox>
        <Wrapper>
          <EditorTitle
            placeholder="제목을 입력하세요"
            value={notice.title}
            onChange={notice.onChangeTitle}
          />

          <EditorBody body={notice.body} onChangeBody={notice.onChangeBody} />
        </Wrapper>

        <EditorFooter
          $edit={!!id}
          onBack={notice.onBack}
          onSubmit={notice.onSubmitNotice}
        />
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
