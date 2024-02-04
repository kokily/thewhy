'use client';

import type { ChangeEvent, SyntheticEvent } from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { media } from '@/helper/client/styles';
import {
  readQuestionAPI,
  removeQuestionAPI,
  validQuestionAPI,
} from '@/helper/client/api/questions';
import { addReplyAPI, removeReplyAPI } from '@/helper/client/api/reply';
import { AdminButtons } from './AdminButtons';
import { QuestionInfo } from './QuestionInfo';
import { QuestionBody } from './QuestionBody';
import { Modal } from '@/components/common/Modal';
import { AddReply } from './reply/AddReply';
import { ReadReply } from './reply/ReadReply';

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

  // 문의글 questionRemoveModal, 댓글 replyRemoveModal
  const [questionRemoveModal, setQuestionRemoveModal] = useState(false);
  const [replyRemoveModal, setReplyRemoveModal] = useState(false);

  // Mutations
  const validPasswordMutate = useMutation({ mutationFn: validQuestionAPI });
  const removeQuestionMutate = useMutation({ mutationFn: removeQuestionAPI });
  const addReplyMutate = useMutation({ mutationFn: addReplyAPI });
  const removeReplyMutate = useMutation({ mutationFn: removeReplyAPI });

  // Data Fetching
  const { data: question, refetch } = useQuery({
    queryKey: ['question'],
    queryFn: () => readQuestionAPI(id),
  });

  const onToggleReply = () => {
    setToggle((prev) => !prev);
  };

  const onChangeReply = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  };

  const onRemoveQuestion = async () => {
    if (status === 'authenticated') {
      // 관리자 접속 중
      await removeQuestionMutate.mutateAsync(
        { id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['questions', 'question', id],
            });
            toast.success('삭제 완료');
            router.replace('/questions');
          },
          onError: (err: any) => {
            toast.error(err);
          },
        },
      );
    } else {
      // 일반 작성자
      const password = window.prompt('작성 시 비밀번호를 입력해주세요');

      if (password) {
        await validPasswordMutate.mutateAsync(
          { id, password },
          {
            onSuccess: async () => {
              await removeQuestionMutate.mutateAsync(
                { id, password },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: ['questions', 'question', id],
                    });
                    toast.success('삭제 완료');
                    router.replace('/questions');
                  },
                  onError: (err: any) => {
                    toast.error(err);
                  },
                },
              );
            },
            onError: (err: any) => {
              toast.error(err);
            },
          },
        );
      } else {
        return;
      }
    }
  };

  const onUpdateQuestion = async () => {
    const password = window.prompt('작성 시 비밀번호를 입력해 주세요.');

    if (password) {
      await validPasswordMutate.mutateAsync(
        {
          id,
          password,
        },
        {
          onSuccess: () => {
            router.push(`/questions/update/${id}`);
          },
          onError: (err: any) => {
            toast.error(err);
          },
        },
      );
    } else {
      return;
    }
  };

  const onAddReply = async (e: SyntheticEvent) => {
    e.preventDefault();

    if ([reply].includes('')) {
      toast.error('댓글 내용 작성 후 저장하세요');
      return;
    }

    await addReplyMutate.mutateAsync(
      { id, payload: { reply } },
      {
        onSuccess: () => {
          setReply('');
          setToggle(false);
          queryClient.invalidateQueries({ queryKey: ['question', id] });
          refetch();
        },
        onError: (err: any) => {
          toast.error(err);
        },
      },
    );
  };

  const onRemoveReply = async () => {
    await removeReplyMutate.mutateAsync(id, {
      onSuccess: () => {
        setReply('');
        setToggle(false);
        queryClient.invalidateQueries({ queryKey: ['question', id] });
        refetch();
      },
      onError: (err: any) => {
        toast.error(err);
      },
    });
  };

  // questionRemoveModal
  const onQuestionRemoveModalClick = () => {
    setQuestionRemoveModal(true);
  };

  const onQuestionRemoveConfirm = () => {
    setQuestionRemoveModal(false);
    onRemoveQuestion();
  };

  const onQuestionRemoveCancel = () => {
    setQuestionRemoveModal(false);
  };

  // replyRemoveModal
  const onReplyRemoveModalClick = () => {
    setReplyRemoveModal(true);
  };

  const onReplyRemoveConfirm = () => {
    setReplyRemoveModal(false);
    onRemoveReply();
  };

  const onReplyRemoveCancel = () => {
    setReplyRemoveModal(false);
  };

  return question ? (
    <ReadQuestionContainer>
      {status === 'authenticated' && (
        <FlexBox>
          <AdminButtons
            modal={questionRemoveModal}
            onRemoveClick={onQuestionRemoveModalClick}
            onConfirm={onQuestionRemoveConfirm}
            onCancel={onQuestionRemoveCancel}
            onRemoveReplyClick={onReplyRemoveModalClick}
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
        <h2>문의글 제목 : {question.title}</h2>
      </FlexBox>

      <FlexBox>
        <QuestionInfo question={question} />
      </FlexBox>

      <FlexBox>
        <QuestionBody body={question.body} />
      </FlexBox>

      <FlexBox>
        <Button onClick={onUpdateQuestion}>문의 글 수정(password)</Button>
      </FlexBox>

      {status === 'authenticated' && toggle && (
        <FlexBox>
          <AddReply
            reply={reply}
            onChange={onChangeReply}
            onAddReply={onAddReply}
          />
        </FlexBox>
      )}

      {question.reply && question.reply !== '' && (
        <ReadReply body={question.reply} />
      )}

      <Modal
        visible={replyRemoveModal}
        onConfirm={onReplyRemoveConfirm}
        onCancel={onReplyRemoveCancel}
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
