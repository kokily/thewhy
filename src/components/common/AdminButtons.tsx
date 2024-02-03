import styled from 'styled-components';

import { media } from '@/helper/client/styles';
import { Modal } from './Modal';

interface Props {
  modal: boolean;
  onRemoveClick: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onUpdate: () => void;
}

export function AdminButtons(props: Props) {
  return (
    <ButtonsContainer>
      <ButtonsButton className="remove" onClick={props.onRemoveClick}>
        삭 제
      </ButtonsButton>

      <ButtonsButton className="update" onClick={props.onUpdate}>
        수 정
      </ButtonsButton>

      <Modal
        visible={props.modal}
        onCancel={props.onCancel}
        onConfirm={props.onConfirm}
      />
    </ButtonsContainer>
  );
}

// Styles
const ButtonsContainer = styled.div`
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

const ButtonsButton = styled.button`
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  margin-right: 0.5rem;
  border-radius: 15px;
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
