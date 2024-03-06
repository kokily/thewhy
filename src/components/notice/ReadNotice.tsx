'use client';

import type { Notice } from '@prisma/client';
import type { SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import client from '@/helper/client/client';
import { media } from '@/helper/client/style';
import { useModal } from '@/helper/client/hooks/useModal';
import { AdminButtons } from '../common/AdminButtons';
import { formatDate } from '@/helper/client/utils';
import { Markdown } from '../common/Markdown';

interface Props {
  id: string;
  notice: Notice;
}

async function removeNoticeAPI(id: string) {
  const response = await client.delete(`/notices/remove/${id}`);
  return response.data;
}

export function ReadNotice({ id, notice }: Props) {
  const { status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Data Mutations
  const removeNoticeMutate = useMutation({ mutationFn: removeNoticeAPI });

  const onUpdateNotice = () => {
    router.push(`/notices/update/${id}`);
  };

  const onRemoveNotice = async (e: SyntheticEvent) => {
    e.preventDefault();
    await removeNoticeMutate.mutateAsync(id, {
      onSuccess: () => {
        toast.success('공지 삭제 완료');
        queryClient.invalidateQueries({ queryKey: ['notices', 'notice', id] });
        router.replace('/notices');
      },
      onError: (err: any) => {
        toast.error(err.error);
      },
    });
  };

  // Remove Modal
  const noticeModal = useModal({ onRemove: onRemoveNotice });

  return (
    <NoticeContainer>
      {status === 'authenticated' && (
        <AdminButtons
          modal={noticeModal.modal}
          onRemoveClick={noticeModal.onModalClick}
          onConfirm={noticeModal.onConfirm}
          onCancel={noticeModal.onCancel}
          onUpdate={onUpdateNotice}
        />
      )}

      <NoticeLayout>
        <NoticeDateBox>
          <h4>{formatDate(notice.createdAt.toString())} 작성</h4>
        </NoticeDateBox>
      </NoticeLayout>

      <NoticeLayout>
        <Markdown markdown={notice.body} />
      </NoticeLayout>
    </NoticeContainer>
  );
}

// Styles
const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoticeLayout = styled.div`
  display: flex;
  width: 100%;
  max-width: 650px;

  ${media.large} {
    max-width: 760px;
  }

  ${media.medium} {
    max-width: 95%;
  }
`;

const NoticeDateBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;

  h4 {
    color: #777;
  }
`;
