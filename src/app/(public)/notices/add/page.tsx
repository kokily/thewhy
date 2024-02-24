'use client';

import { AddNotice } from '@/components/notices/add/AddNotice';
import { useNotice } from '../_useNotice';

export default function AddNoticePage() {
  const noticeHook = useNotice({ id: null });

  return <AddNotice id={null} notice={noticeHook} />;
}
