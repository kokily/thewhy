import type { ChangeEvent } from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ label, name, value, onChange }: Props) {
  return (
    <>
      <LabelContainer>{label}</LabelContainer>
      <InputContainer
        type="text"
        name={name}
        value={value}
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

const InputContainer = styled.input`
  display: block;
  width: 100%;
  height: auto;
  padding: 0.5rem;
  font-size: 1em;
  font-weight: 400;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  outline: none;
  transition: border-color 0.15s ease-in-out;
  -webkit-appearance: none;

  &:after {
    content: '.';
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
  }
`;
