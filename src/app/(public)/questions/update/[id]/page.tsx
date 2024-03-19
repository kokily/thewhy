'use client';

import { AddQuestion } from '@/components/questions/add/AddQuestion';
import { useQuestion } from '@/helper/client/hooks/useQuestion';

export default function UpdateQuestionPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const question = useQuestion({ id });

  return <AddQuestion question={question} />;
}
