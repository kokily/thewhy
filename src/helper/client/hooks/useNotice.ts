'use client';

import type { Notice } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import client from '@/helper/client/client';

// API
async function addNoticeAPI(payload: AddNoticePayload) {
  const response = await client.post<Notice>('/notices/add', payload);
  return response.data;
}

async function updateNoticeAPI({
  id,
  payload,
}: {
  id: string;
  payload: AddNoticePayload;
}) {
  const response = await client.patch<Notice>(`/notices/update/${id}`, payload);
  return response.data;
}

async function readNoticeAPI(id: string) {
  const response = await client.get<Notice>(`/notices/${id}`);
  return response.data;
}

interface Props {
  id?: string;
}

export function useNotice({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // States
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // Update Data Fetching
  const { data } = useQuery({
    queryKey: ['updateNotice'],
    queryFn: () => readNoticeAPI(id),
    enabled: !!id,
  });

  // Data Mutations
  const addNoticeMutate = useMutation({ mutationFn: addNoticeAPI });
  const updateNoticeMutate = useMutation({ mutationFn: updateNoticeAPI });

  const onBack = () => {
    router.back();
  };

  const onChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const onChangeBody = (text: string) => {
    setBody(text);
  };

  const onSubmitNotice = async (e: SyntheticEvent) => {
    e.preventDefault();

    if ([title, body].includes('')) {
      toast.error('빈 칸 없이 입력하세요');
      return;
    }

    if (!id) {
      await addNoticeMutate.mutateAsync(
        {
          title,
          body,
        },
        {
          onSuccess: (data) => {
            toast.success('공지글 저장!');
            queryClient.invalidateQueries({ queryKey: ['notices', 'notice', id] });
            router.replace(`/notice/${data.id}`);
          },
          onError: (err: any) => {
            toast.error(err.error);
          },
        },
      );
    } else {
      await updateNoticeMutate.mutateAsync(
        {
          id,
          payload: { title, body },
        },
        {
          onSuccess: (data) => {
            toast.success('공지글 수정!');
            queryClient.invalidateQueries({ queryKey: ['notices', 'notice', id] });
            router.replace(`/notice/${data.id}`);
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
      setTitle(data.title);
      setBody(data.body);
    }
  }, [data]);

  return {
    title,
    body,
    onBack,
    onChangeTitle,
    onChangeBody,
    onSubmitNotice,
  };
}
