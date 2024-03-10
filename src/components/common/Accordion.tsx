import type { MouseEvent, ReactNode } from 'react';
import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  title: string | ReactNode;
  body: string | ReactNode;
}

export function Accordion({ title, body }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const [toggle, setToggle] = useState(false);

  const onToggleAccordion = useCallback(
    (e: MouseEvent) => {
      // 상위 엘리먼트로 전파 중지(이벤트 버블링)
      e.stopPropagation();

      if (parentRef.current === null || childRef.current === null) {
        return;
      }

      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = '0';
      } else {
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
      }

      setToggle((prev) => !prev);
    },
    [toggle],
  );

  const parentRefHeight = parentRef.current?.style.height ?? '0px';
  const buttonText = parentRefHeight === '0px' ? '∧' : '∨';

  return (
    <AccordionContainer>
      <AccordionHeader onClick={onToggleAccordion}>
        <AccordionTitle>
          {title}
          <span>{buttonText}</span>
        </AccordionTitle>
      </AccordionHeader>

      <AccordionContents ref={parentRef}>
        <AccordionContent ref={childRef}>{body}</AccordionContent>
      </AccordionContents>
    </AccordionContainer>
  );
}

// Styles
const AccordionContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  margin: 10px;
`;

const AccordionHeader = styled.div`
  color: #0088cc;
`;

const AccordionTitle = styled.div`
  display: flex;
  min-width: 260px;
  border-left: 3px solid #f7f7f7;
  background: #f7f7f7;
  border-radius: 5px;
  border-left-color: #0088cc;
  border-right-color: #0088cc;
  font-weight: 600;
  padding: 12px 20px 12px 15px;
  cursor: pointer;
  user-select: none;

  span {
    margin-left: auto;
  }
`;

const AccordionContents = styled.div`
  height: 0;
  overflow: hidden;
  transition: height 0.15s ease, background-color 0.15s ease;
`;

const AccordionContent = styled.div`
  padding: 0.1px;
`;
