import type { ChangeEvent } from 'react';
import styled from 'styled-components';

interface Props {
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export function Input(props: Props) {
  return (
    <InputContainer
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
    />
  );
}

// Styles
const InputContainer = styled.input`
  padding: 0.6rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  transition: 0.12s;
  padding-left: 40px;

  &:focus {
    outline: none;
    background: #fcfcfc;
    border: 1px solid #0c89d1;
  }
`;
