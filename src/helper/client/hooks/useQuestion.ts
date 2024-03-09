import type { Question } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import client from '../client';

// APIs
async function addQuestionAPI(payload: AddQuestionPayload) {
  const response = await client.post<Question>(`/questions/add`, payload);
  return response.data;
}

async function updateQuestionAPI({
  id,
  payload,
}: {
  id: string;
  payload: AddQuestionPayload;
}) {
  const response = await client.patch<Question>(`/questions/update/${id}`, payload);
  return response.data;
}

async function readQuestionAPI(id: string) {
  const response = await client.get<Question>(`/questions/${id}`);
  return response.data;
}

interface Props {
  id?: string;
}

export function useQuestion({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Variables
  const initialState = {
    username: '',
    password: '',
    title: '',
    body: '',
    phone: '',
    email: '',
  };
  const [inputs, setInputs] = useState(initialState);
  const { username, password, title, body, phone, email } = inputs;
  const [agree, setAgree] = useState(false);

  // Data Mutations
  const addQuestionMutate = useMutation({ mutationFn: addQuestionAPI });
  const updateQuestionMutate = useMutation({ mutationFn: updateQuestionAPI });

  // Data Fetching for Update
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
      toast.warning('* 표시는 전부 기록해주세요.');
      return;
    }

    if (agree === false) {
      toast.warning('개인정보 제공 동의를 해주셔야 합니다.');
      return;
    }

    if (!id) {
      await addQuestionMutate.mutateAsync(
        {
          ...inputs,
        },
        {
          onSuccess: (data) => {
            toast.success('문의글 저장');
            queryClient.invalidateQueries({ queryKey: ['questions', 'question'] });
            router.replace(`/question/${data.id}`);
          },
          onError: (err: any) => {
            toast.error(err.error);
          },
        },
      );
    } else {
      await updateQuestionMutate.mutateAsync(
        {
          id,
          payload: { ...inputs },
        },
        {
          onSuccess: (data) => {
            toast.success('문의글 수정');
            queryClient.invalidateQueries({
              queryKey: ['questions', 'question', id],
            });
            router.replace(`/question/${data.id}`);
          },
          onError: (err: any) => {
            toast.error(err.error);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (data) {
      setInputs({
        username: data.username,
        password: '',
        title: data.title,
        body: data.body,
        email: data.email,
        phone: data.phone,
      });
    }
  }, [data]);

  return {
    username,
    password,
    title,
    body,
    email,
    phone,
    agree,
    onChange,
    onToggleAgree,
    onSubmitQuestion,
  };
}
