'use client';

import { AddNotice } from '@/components/notices/add/AddNotice';
import { useNotice } from '../_hooks/useNotice';

export default function AddNoticePage() {
  const { title, body, onBack, onChangeTitle, onChangeBody, onSubmitNotice } =
    useNotice({ id: null });

  return (
    <AddNotice
      title={title}
      body={body}
      onBack={onBack}
      onChangeTitle={onChangeTitle}
      onChangeBody={onChangeBody}
      onSubmitNotice={onSubmitNotice}
    />
  );
}