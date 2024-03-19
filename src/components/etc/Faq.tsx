'use client';

import styled from 'styled-components';
import { Accordion } from '@/components/common/Accordion';

export function Faq() {
  return (
    <FaqContainer>
      <h2>
        FAQ <strong>Questions</strong>
      </h2>

      <Accordion title="title1" body="어코디언 1번" />
    </FaqContainer>
  );
}

// Styles
const FaqContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1110px;

  h2 {
    font-weight: 400;

    strong {
      font-weight: 700;
    }
  }
`;
