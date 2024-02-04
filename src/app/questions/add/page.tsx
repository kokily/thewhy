'use client';

import { AddQuestion } from '@/components/questions/add/AddQuestion';
import { useQuestion } from '../_hooks/useQuestion';

export default function AddQuestionPage() {
  const {
    username,
    password,
    title,
    body,
    phone,
    email,
    agree,
    onChange,
    onToggleAgree,
    onSubmitQuestion,
  } = useQuestion({});

  return (
    <AddQuestion
      username={username}
      password={password}
      title={title}
      body={body}
      phone={phone}
      email={email}
      agree={agree}
      onChange={onChange}
      onToggleAgree={onToggleAgree}
      onSubmitQuestion={onSubmitQuestion}
    />
  );
}
