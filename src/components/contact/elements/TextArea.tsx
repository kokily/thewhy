import type { ChangeEvent } from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  name: string;
  body: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({ label, body, onChange }: Props) {
  return (
    <>
      <LabelContainer>{label}</LabelContainer>
      <TextareaContainer
        rows={8}
        name="body"
        value={body}
        onChange={onChange}
        required
      />
    </>
  );
}

// Styles
const LabelContainer = styled.label`
  display: inline-block;
  font-size: 0.9em;
  font-weight: 300;
  margin-bottom: 0.5rem;
  color: #777;
`;

const TextareaContainer = styled.textarea`
  display: block;
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.15s ease-in-out;
  resize: vertical;
  padding: 0.5rem;
  font-size: 1em;
  font-weight: 400;
  color: #495057;
`;
