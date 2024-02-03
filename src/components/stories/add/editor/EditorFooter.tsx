import type { SyntheticEvent } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/common/Button';

interface Props {
  onBack: () => void;
  onSubmit: (e: SyntheticEvent) => void;
}

export function EditorFooter({ onBack, onSubmit }: Props) {
  return (
    <EditorFooterContainer>
      <Button back onClick={onBack}>
        뒤로가기
      </Button>
      <Button submit onClick={onSubmit}>
        저장하기
      </Button>
    </EditorFooterContainer>
  );
}

// Styles
const EditorFooterContainer = styled.div`
  bottom: 0px;
  margin-top: 4rem;
  padding-left: 1rem;
  width: 100%;
  height: 4rem;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.85);
  display: flex;
  justify-content: flex-start;
  align-items: center;

  button + button {
    margin-left: 1rem;
  }
`;
