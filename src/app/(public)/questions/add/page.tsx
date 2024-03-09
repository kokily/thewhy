'use client';

import { AddQuestion } from '@/components/questions/add/AddQuestion';
import { useQuestion } from '@/helper/client/hooks/useQuestion';

export default function AddQuestionPage() {
  const question = useQuestion({});

  return <AddQuestion question={question} />;
}
