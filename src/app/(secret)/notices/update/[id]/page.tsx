'use client';

import { AddNotice } from '@/components/notices/add/AddNotice';
import { useNotice } from '@/helper/client/hooks/useNotice';

export default function UpdateNoticePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const notice = useNotice({ id });

  return <AddNotice id={id} notice={notice} />;
}
