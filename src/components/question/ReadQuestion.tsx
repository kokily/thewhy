'use client';

import type { Question } from '@prisma/client';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import client from '@/helper/client/client';
import { useModal } from '@/helper/client/hooks/useModal';
import { media } from '@/helper/client/style';
import { AdminQuestionButtons } from './AdminQuestionButtons';
import { Modal } from '../common/Modal';
import { QuestionInfo } from './QuestionInfo';
import { QuestionBody } from './QuestionBody';
import { AddReply } from './AddReply';
import { ReadReply } from './ReadReply';

// APIs
async function readQuestionAPI(id: string) {
  const response = await client.get<Question>(`/questions/${id}`);
  return response.data;
}

async function validPasswordAPI({ id, password }: { id: string; password: string }) {
  const response = await client.patch<boolean>(`/questions/valid/${id}`, {
    password,
  });
  return response.data;
}

async function removeQuestionAPI({
  id,
  password,
}: {
  id: string;
  password?: string;
}) {
  const response = await client.patch(`/questions/remove/${id}`, { password });
  return response.data;
}

async function addReplyAPI({
  id,
  payload,
}: {
  id: string;
  payload: AddReplyPayload;
}) {
  const response = await client.post<Question>(`/reply/add/${id}`, payload);
  return response.data;
}

async function removeReplyAPI(id: string) {
  const response = await client.delete(`/reply/remove/${id}`);
  return response.data;
}

interface Props {
  id: string;
}

export function ReadQuestion({ id }: Props) {
  const { status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  // 댓글창 toggle, 댓글내용 reply
  const [toggle, setToggle] = useState(false);
  const [reply, setReply] = useState('');

  // Data Fetching
  const { data: question, refetch } = useQuery({
    queryKey: ['question'],
    queryFn: () => readQuestionAPI(id),
    enabled: !!id,
  });

  // Data Mutations
  const validPaswordMutate = useMutation({ mutationFn: validPasswordAPI });
  const removeQuestionMutate = useMutation({ mutationFn: removeQuestionAPI });
  const addReplyMutate = useMutation({ mutationFn: addReplyAPI });
  const removeReplyMutate = useMutation({ mutationFn: removeReplyAPI });

  const onToggleReply = () => {
    setToggle((prev) => !prev);
  };

  const onChangeReply = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  };

  const onRemoveQuestion = async (e: SyntheticEvent) => {
    e.preventDefault();
    // 관리자, 일반 사용자 검증
    if (status === 'authenticated') {
      await removeQuestionMutate.mutateAsync(
        {
          id,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['questions', 'question', id],
            });
            toast.success('삭제 완료');
            router.replace('/questions');
          },
          onError: (err: any) => {
            toast.error(err.error);
          },
        },
      );
    } else {
      const password = window.prompt('작성 시 비밀번호를 입력해주세요');

      if (password) {
        await validPaswordMutate.mutateAsync(
          { id, password },
          {
            onSuccess: async () => {
              await removeQuestionMutate.mutateAsync(
                {
                  id,
                  password,
                },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: ['questions', 'question', id],
                    });
                    toast.success('삭제 완료');
                    router.replace('/questions');
                  },
                  onError: (err: any) => {
                    toast.error(err.error);
                  },
                },
              );
            },
            onError: (err: any) => {
              toast.error(err.error);
            },
          },
        );
      } else {
        return;
      }
    }
  };

  const onAddReply = async (e: SyntheticEvent) => {
    e.preventDefault();

    if ([reply].includes('')) {
      toast.success('댓글을 작성 후 저장하세요');
      return;
    }

    await addReplyMutate.mutateAsync(
      { id, payload: { reply } },
      {
        onSuccess: () => {
          setReply('');
          setToggle(false);
          queryClient.invalidateQueries({ queryKey: ['questions', 'question', id] });
          refetch();
        },
        onError: (err: any) => {
          toast.error(err.error);
        },
      },
    );
  };

  const onRemoveReply = async (e: SyntheticEvent) => {
    e.preventDefault();

    await removeReplyMutate.mutateAsync(id, {
      onSuccess: () => {
        setReply('');
        setToggle(false);
        queryClient.invalidateQueries({ queryKey: ['questions', 'question', id] });
        refetch();
      },
      onError: (err: any) => {
        toast.error(err.error);
      },
    });
  };

  // questionModal 문의글 모달, replyModal 댓글 모달
  const questionModal = useModal({ onRemove: onRemoveQuestion });
  const replyModal = useModal({ onRemove: onRemoveReply });

  return question ? (
    <ReadQuestionContainer>
      {status === 'authenticated' && (
        <FlexBox>
          <AdminQuestionButtons
            modal={questionModal.modal}
            onRemoveClick={questionModal.onModalClick}
            onConfirm={questionModal.onConfirm}
            onCancel={questionModal.onCancel}
            onRemoveReplyClick={replyModal.onModalClick}
            toggle={toggle}
            onToggle={onToggleReply}
            reply={question.reply}
          />
        </FlexBox>
      )}

      <FlexBox>
        <Button onClick={onRemoveQuestion}>삭제하기</Button>
      </FlexBox>

      <FlexBox>
        <h2>문의글 제목: {question.title}</h2>
      </FlexBox>

      <FlexBox>
        <QuestionInfo question={question} />
      </FlexBox>

      <FlexBox>
        <QuestionBody body={question.body} />
      </FlexBox>

      {status === 'authenticated' && toggle && (
        <FlexBox>
          <AddReply reply={reply} onAddReply={onAddReply} onChange={onChangeReply} />
        </FlexBox>
      )}

      {question.reply && question.reply !== '' && (
        <ReadReply body={question.reply} />
      )}

      <Modal
        visible={replyModal.modal}
        onCancel={replyModal.onCancel}
        onConfirm={replyModal.onConfirm}
      />
    </ReadQuestionContainer>
  ) : null;
}

// Styles
const ReadQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexBox = styled.div`
  display: flex;
  width: 100%;
  max-width: 1110px;
  justify-content: center;
  margin-bottom: 1.5rem;

  ${media.large} {
    max-width: 760px;
  }

  ${media.medium} {
    max-width: 95%;
  }
`;

const Button = styled.button`
  font-weight: 600;
  background: white;
  color: #bdb219;
  padding: 0.3rem 0.6rem;
  border: 2px solid #bdb219;
  border-radius: 25px;
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, 0.1);
  transition: 0.12s;
  cursor: pointer;

  &:hover {
    background: #bdb219;
    color: white;
  }

  &:active {
    transform: translateY(2px);
    box-shadow: none;
  }
`;
