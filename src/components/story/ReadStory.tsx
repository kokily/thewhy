'use client';

import type { Story } from '@prisma/client';
import type { SyntheticEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { media } from '@/helper/client/style';
import client from '@/helper/client/client';
import { useModal } from '@/helper/client/hooks/useModal';
import { AdminButtons } from '../common/AdminButtons';
import { StoryDate } from './StoryDate';
import { StoryTitle } from './StoryTitle';
import { Markdown } from '../common/Markdown';

async function removeStoryAPI(id: string) {
  const response = await client.delete(`/stories/remove/${id}`);
  return response.data;
}

interface Props {
  id: string;
  story: Story;
}

export function ReadStory({ id, story }: Props) {
  const { status } = useSession();
  const router = useRouter();

  // Mutations
  const removeStoryMutate = useMutation({ mutationFn: removeStoryAPI });

  const onUpdateStory = () => {
    router.push(`/stories/update/${id}`);
  };

  const onRemoveStory = async (e: SyntheticEvent) => {
    e.preventDefault();

    await removeStoryMutate.mutateAsync(id, {
      onSuccess: () => {
        toast.success('삭제 완료');
        router.replace('/stories');
      },
      onError: (err: any) => {
        toast.error(err.error);
      },
    });
  };

  // Remove Modal
  const storyModal = useModal({ onRemove: onRemoveStory });

  return (
    <StoryContainer>
      <FlexBox>
        <Image
          src={story.thumbnail}
          alt={story.title}
          width={1110}
          height={650}
          priority={true}
        />
      </FlexBox>

      {status === 'authenticated' && (
        <AdminButtons
          modal={storyModal.modal}
          onRemoveClick={storyModal.onModalClick}
          onConfirm={storyModal.onConfirm}
          onCancel={storyModal.onCancel}
          onUpdate={onUpdateStory}
        />
      )}

      <FlexBox>
        <StoryDate date={story.createdAt.toString()} />
        <StoryTitle title={story.title} tags={story.tags} />
      </FlexBox>

      <FlexBox>
        <Markdown markdown={story.body} />
      </FlexBox>
    </StoryContainer>
  );
}

// Styles
const StoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexBox = styled.div`
  display: flex;
  width: 100%;
  max-width: 1110px;
  margin-bottom: 1rem;

  img {
    width: 100%;
    margin-bottom: 1.2rem;
  }

  ${media.large} {
    max-width: 760px;
  }

  ${media.medium} {
    max-width: 95%;
  }
`;
