import styled from 'styled-components';
import { media } from '@/helper/client/style';
import { QuestionForm } from './QuestionForm';

interface Props {
  question: QuestionType;
}

export function AddQuestion({ question }: Props) {
  return (
    <AddQuestionContainer>
      <FlexBox>
        <QuestionForm question={question} />
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
