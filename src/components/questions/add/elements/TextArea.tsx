import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface Props {
  body: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({ body, onChange }: Props) {
  return (
    <TextAreaContainer name="body" value={body} onChange={onChange} rows={10} />
  );
}

// Styles
const TextAreaContainer = styled.textarea`
  display: block;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  outline: none;
  transition: border-color 0.15s ease-in-out;
  resize: vertical;
  padding: 0.5rem;
  font-size: 1em;
  font-weight: 400;
  color: #495057;

  &:focus {
    outline: none;
    background: #fcfcfc;
    border: 1px solid #0c89d1;
  }
`;
