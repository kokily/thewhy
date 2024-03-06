'use client';

import type { Story } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import client from '../client';

// APIs
async function addStoryAPI(payload: AddStoryPayload) {
  const response = await client.post<Story>('/stories/add', payload);
  return response.data;
}

async function updateStoryAPI({
  id,
  payload,
}: {
  id: string;
  payload: AddStoryPayload;
}) {
  const response = await client.patch<Story>(`/stories/update/${id}`, payload);
  return response.data;
}

async function readStoryAPI(id: string) {
  const response = await client.get<Story>(`/stories/${id}`);
  return response.data;
}

interface Props {
  id?: string;
}

export function useStory({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // States
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState<Array<string>>([]);

  // Update Data Fetching
  const { data } = useQuery({
    queryKey: ['updateStory'],
    queryFn: () => readStoryAPI(id),
    enabled: !!id,
  });

  // Data Mutations
  const addStoryMutate = useMutation({ mutationFn: addStoryAPI });
  const updateStoryMutate = useMutation({ mutationFn: updateStoryAPI });

  const onBack = () => {
    router.back();
  };

  const onChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const onChangeBody = (text: string) => {
    setBody(text);
  };

  const onChangeTags = (nextTags: Array<string>) => {
    setTags(nextTags);
  };

  const onUploadThumbnail = () => {
    const upload = document.createElement('input');

    upload.setAttribute('type', 'file');
    upload.setAttribute('accept', 'image/*');
    upload.click();

    upload.addEventListener('change', async () => {
      const file = upload.files[0];
      const formData = new FormData();

      formData.append('file', file);

      try {
        const response = await client.post('/upload', formData);

        if (response.status === 200) {
          setThumbnail(response.data.url);
        } else {
          toast.error(response.status);
        }
      } catch (err: any) {
        console.log(err.error);
      }
    });
  };

  const onSubmitStory = async (e: SyntheticEvent) => {
    e.preventDefault();

    if ([title, body, thumbnail].includes('')) {
      toast.error('빈 칸 없이 입력하세요');
      return;
    }

    if (tags.length < 1) {
      toast.error('태그는 최소 1개 이상입니다');
      return;
    }

    if (!id) {
      await addStoryMutate.mutateAsync(
        {
          title,
          body,
          thumbnail,
          tags,
        },
        {
          onSuccess: (data) => {
            toast.success('스토리 저장!');
            queryClient.invalidateQueries({ queryKey: ['stories', 'story'] });
            router.replace(`/story/${data.id}`);
          },
          onError: (err: any) => {
            toast.error(err.error);
          },
        },
      );
    } else {
      await updateStoryMutate.mutateAsync(
        {
          id,
          payload: {
            title,
            body,
            thumbnail,
            tags,
          },
        },
        {
          onSuccess: (data) => {
            toast.success('스토리 수정!');
            queryClient.invalidateQueries({ queryKey: ['stories', 'story', id] });
            router.replace(`/story/${data.id}`);
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
      setThumbnail(data.thumbnail);
      setTags(data.tags);
    }
  }, [data]);

  return {
    title,
    body,
    thumbnail,
    tags,
    onBack,
    onChangeTitle,
    onChangeBody,
    onChangeTags,
    onUploadThumbnail,
    onSubmitStory,
  };
}
