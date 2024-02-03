'use client';

import { AddNotice } from '@/components/notices/add/AddNotice';
import { useNotice } from '../../_hooks/useNotice';

export default function UpdateNoticePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { title, body, onBack, onChangeTitle, onChangeBody, onSubmitNotice } =
    useNotice({ id });

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
