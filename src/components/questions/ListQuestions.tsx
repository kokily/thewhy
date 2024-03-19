import type { Question } from '@prisma/client';
import type { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { media } from '@/helper/client/style';
import styled from 'styled-components';
import { SearchBox } from './SearchBox';
import { QuestionsTable } from './QuestionsTable';

interface Props {
  questions: Array<Question>;
  search: string;
  select: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSearch: (e: SyntheticEvent) => void;
  onReadQuestion: (id: string) => void;
  setTarget: Dispatch<SetStateAction<HTMLElement | null | undefined>>;
}

export function ListQuestions(props: Props) {
  return (
    <QuestionsContainer>
      <QuestionsContents>
        <SearchBox
          search={props.search}
          select={props.select}
          onChange={props.onChange}
          onChangeSelect={props.onChangeSelect}
          onSearch={props.onSearch}
        />

        <QuestionsTable
          questions={props.questions}
          onReadQuestion={props.onReadQuestion}
        />

        <div ref={props.setTarget} />
      </QuestionsContents>
    </QuestionsContainer>
  );
}

// Styles
const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionsContents = styled.div`
  width: 100%;
  justify-content: center;

  ${media.large} {
    max-width: 760px;
  }
`;
