import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  addQuestionAPI,
  readQuestionAPI,
  updateQuestionAPI,
} from '@/helper/client/api/questions';

interface Props {
  id?: string;
}

export function useQuestion({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Variables
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    title: '',
    body: '',
    phone: '',
    email: '',
  });
  const { username, password, title, body, phone, email } = inputs;
  const [agree, setAgree] = useState(false);

  // Mutations
  const addQuestionMutate = useMutation({ mutationFn: addQuestionAPI });
  const updateQuestionMutate = useMutation({ mutationFn: updateQuestionAPI });

  // Data Fetching
  const { data } = useQuery({
    queryKey: ['updateQuestion'],
    queryFn: () => readQuestionAPI(id),
    enabled: !!id,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onToggleAgree = () => {
    setAgree((prev) => !prev);
  };

  const onSubmitQuestion = async (e: SyntheticEvent) => {
    e.preventDefault();

    if ([username, password, title, body].includes('')) {
      toast.warning('* 표시는 전부 기록해 주세요');
      return;
    }

    if (agree === false) {
      toast.warning('개인정보 제공 동의를 해주셔야 합니다.');
      return;
    }

    if (!id) {
      // Add Question
      await addQuestionMutate.mutateAsync(
        {
          username,
          password,
          title,
          body,
          phone,
          email,
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['questions'] });
            toast.success('문의 작성');
            router.replace(`/questions/read/${data.id}`);
          },
          onError: (err: any) => {
            toast.error(err);
          },
        },
      );
    } else {
      // Update Question
      await updateQuestionMutate.mutateAsync(
        {
          id,
          payload: {
            username,
            password,
            title,
            body,
            phone,
            email,
          },
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: ['questions', 'question', 'updateQuestion', id],
            });
            toast.success('문의글 수정');
            router.replace(`/questions/read/${data.id}`);
          },
          onError: (err: any) => {
            toast.error(err);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (data) {
      setInputs({
        username: data.username,
        password: data.password,
        title: data.title,
        body: data.body,
        phone: data.phone,
        email: data.email,
      });
    }
  }, [data]);

  return {
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
  };
}
