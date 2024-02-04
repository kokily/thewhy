import localFont from 'next/font/local';
import styled from 'styled-components';
import clsx from 'clsx';

import { media } from '@/helper/client/styles';
import { Modal } from '@/components/common/Modal';

const yoon320 = localFont({
  src: '../../../../public/fonts/YDIYGO320.woff2',
  display: 'swap',
});

interface Props {
  modal: boolean;
  onRemoveClick: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onRemoveReplyClick: () => void;
  toggle: boolean;
  onToggle: () => void;
  reply: string;
}

export function AdminButtons(props: Props) {
  return (
    <>
      <AdminButtonsContainer>
        <Button
          className={clsx(yoon320.className, 'remove')}
          onClick={props.onRemoveClick}
        >
          관리자 삭제
        </Button>

        {props.reply && props.reply !== '' ? (
          <Button
            className={clsx(yoon320.className, 'update')}
            onClick={props.onRemoveReplyClick}
          >
            답글 삭제
          </Button>
        ) : (
          <Button
            className={clsx(yoon320.className, 'update')}
            onClick={props.onToggle}
          >
            {props.toggle ? '댓글 닫기' : '댓글 열기'}
          </Button>
        )}
      </AdminButtonsContainer>

      <Modal
        visible={props.modal}
        onConfirm={props.onConfirm}
        onCancel={props.onCancel}
      />
    </>
  );
}

// Styles
const AdminButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1110px;
  justify-content: center;
  margin-bottom: 2rem;

  ${media.large} {
    max-width: 760px;
  }

  ${media.medium} {
    max-width: 95%;
  }
`;

const Button = styled.button`
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  margin-right: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  background: white;
  box-shadow: 2px 2px 4px 0px gray;
  transition: 0.12s;

  &.remove {
    color: red;
    border: 2px solid red;

    &:hover {
      background: red;
      color: white;
    }

    &:active {
      background: red;
      color: white;
      transform: translateY(2px);
      box-shadow: none;
    }
  }

  &.update {
    color: #00c2a8;
    border: 2px solid #00c2a8;

    &:hover {
      background: #00c2a8;
      color: white;
    }

    &:active {
      background: #00c2a8;
      color: white;
      transform: translateY(2px);
      box-shadow: none;
    }
  }
`;
