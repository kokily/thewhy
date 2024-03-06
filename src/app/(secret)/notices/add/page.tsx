'use client';

import { AddNotice } from '@/components/notices/add/AddNotice';
import { useNotice } from '@/helper/client/hooks/useNotice';

export default function AddNoticePage() {
  const notice = useNotice({});

  return <AddNotice id={null} notice={notice} />;
}
