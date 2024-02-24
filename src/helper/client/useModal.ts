import { type SyntheticEvent, useState } from 'react';

interface Props {
  onRemove: (e: SyntheticEvent) => void;
}

export function useModal({ onRemove }: Props) {
  const [modal, setModal] = useState(false);

  const onModalClick = () => {
    setModal(true);
  };

  const onConfirm = (e: SyntheticEvent) => {
    setModal(false);
    onRemove(e);
  };

  const onCancel = () => {
    setModal(false);
  };

  return {
    modal,
    onModalClick,
    onConfirm,
    onCancel,
  };
}
