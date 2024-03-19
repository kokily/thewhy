'use client';

import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import {
  addNoticeAPI,
  readNoticeAPI,
  updateNoticeAPI,
} from '@/helper/client/api/notices';
import { toast } from 'react-toastify';

interface Props {
  id?: string;
}

export function useNotice({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // Mutations
  const addNoticeMutate = useMutation({ mutationFn: addNoticeAPI });
  const updateNoticeMutate = useMutation({ mutationFn: updateNoticeAPI });

  // Data Fetching
  const { data } = useQuery({
    queryKey: ['updateNotice'],
    queryFn: () => readNoticeAPI(id),
    enabled: !!id,
  });

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

    if (!id) {
      // Add Notice
      await addNoticeMutate.mutateAsync(
        {
          title,
          body,
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: ['notices', 'notice'],
            });
            toast.success('공지 저장');
            router.replace(`/notices/read/${data.id}`);
          },
          onError: (err: any) => {
            toast.error(err.message);
          },
        },
      );
    } else {
      // Update Notice
      await updateNoticeMutate.mutateAsync(
        {
          id,
          payload: {
            title,
            body,
          },
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({
              queryKey: ['notices', 'notice', id, 'updateNotice'],
            });
            toast.success('공지 수정');
            router.replace(`/notices/read/${data.id}`);
          },
          onError: (err: any) => {
            toast.error(err.message);
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
