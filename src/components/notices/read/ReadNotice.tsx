'use client';

import type { Notice } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { media } from '@/helper/client/styles';
import { AdminButtons } from '@/components/common/AdminButtons';
import formatDate from '@/helper/client/utils';
import { Markdown } from '@/components/common/Markdown';
import { removeNoticeAPI } from '@/helper/client/api/notices';

interface Props {
  id: string;
  notice: Notice;
}

export function ReadNotice({ id, notice }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Modal
  const [removeModal, setRemoveModal] = useState(false);

  // Data Mutations
  const removeNoticeMutate = useMutation({ mutationFn: removeNoticeAPI });

  const onUpdateNotice = () => {
    router.push(`/notices/update/${id}`);
  };

  const onRemoveNotice = async () => {
    await removeNoticeMutate.mutateAsync(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notices', 'notice', id] });
        toast.success('공지사항 삭제');
        router.replace('/notices');
      },
      onError: (err: any) => {
        toast.error(err.message);
      },
    });
  };

  // Remove Modal
  const onRemoveClick = () => {
    setRemoveModal(true);
  };

  const onConfirm = () => {
    setRemoveModal(false);
    onRemoveNotice();
  };

  const onCancel = () => {
    setRemoveModal(false);
  };

  return (
    <NoticeContainer>
      <AdminButtons
        modal={removeModal}
        onRemoveClick={onRemoveClick}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onUpdate={onUpdateNotice}
      />

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
