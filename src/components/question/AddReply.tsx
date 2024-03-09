import type { ChangeEvent, SyntheticEvent } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/common/Button';

interface Props {
  reply: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onAddReply: (e: SyntheticEvent) => void;
}

export function AddReply({ reply, onChange, onAddReply }: Props) {
  return (
    <AddReplyContainer>
      <Box>
        <h4>답글 달기</h4>
        <textarea rows={8} name="reply" value={reply} onChange={onChange} />

        <ButtonBox>
          <Button $submit={true} onClick={onAddReply}>
            답글 저장
          </Button>
        </ButtonBox>
      </Box>
    </AddReplyContainer>
  );
}

// Styles
const AddReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;

  textarea {
    border-color: rgba(0, 0, 0, 0.09);
    border-radius: 8px;
    margin-bottom: 1rem;
    padding: 15px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;
