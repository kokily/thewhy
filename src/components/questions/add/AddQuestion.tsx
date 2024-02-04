import { media } from '@/helper/client/styles';
import { ChangeEvent, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { QuestionForm } from './QuestionForm';

interface Props {
  username: string;
  password: string;
  title: string;
  body: string;
  phone: string;
  email: string;
  agree: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onToggleAgree: () => void;
  onSubmitQuestion: (e: SyntheticEvent) => void;
}

export function AddQuestion(props: Props) {
  return (
    <AddQuestionContainer>
      <FlexBox>
        <QuestionForm
          username={props.username}
          password={props.password}
          title={props.title}
          body={props.body}
          phone={props.phone}
          email={props.email}
          agree={props.agree}
          onChange={props.onChange}
          onToggleAgree={props.onToggleAgree}
          onSubmitQuestion={props.onSubmitQuestion}
        />
      </FlexBox>
    </AddQuestionContainer>
  );
}

// Styles
const AddQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1110px;

  ${media.large} {
    max-width: 760px;
  }

  ${media.medium} {
    max-width: 95%;
  }
`;
