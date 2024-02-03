import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import client from '@/helper/client/api/client';
import {
  addStoryAPI,
  readStoryAPI,
  updateStoryAPI,
} from '@/helper/client/api/stories';

interface Props {
  id?: string;
}

export function useStory({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState<Array<string>>([]);

  // Query
  const { data } = useQuery({
    queryKey: ['updateStory'],
    queryFn: () => readStoryAPI(id),
    enabled: !!id,
  });

  // Mutations
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

  // 썸네일 업로드
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
        console.log(err);
      }
    });
  };

  const onSubmitStory = async (e: SyntheticEvent) => {
    e.preventDefault();

    if ([title, body, thumbnail].includes('')) {
      toast.error('빈 칸 없이 입력해 주세요');
      return;
    }

    if (!id) {
      // Add Story
      await addStoryMutate.mutateAsync(
        {
          title,
          body,
          thumbnail,
          tags,
        },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['stories'] });
            router.replace(`/stories/read/${data.id}`);
          },
          onError: (err: any) => {
            toast.error(err.message);
          },
        },
      );
    } else {
      // Update Story
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
            queryClient.invalidateQueries({ queryKey: ['stories'] });
            router.replace(`/stories/read/${data.id}`);
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
