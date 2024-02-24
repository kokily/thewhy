'use client';

import { AddNotice } from '@/components/notices/add/AddNotice';
import { useNotice } from '../../_useNotice';

export default function UpdateNoticePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const noticeHook = useNotice({ id });

  return <AddNotice id={id} notice={noticeHook} />;
}
