import styled, { css } from 'styled-components';

interface Props {
  agree: boolean;
  onToggleAgree: () => void;
}

export function CheckBox({ agree, onToggleAgree }: Props) {
  return (
    <CheckBoxContainer agree={agree}>
      <input
        type="checkbox"
        name="agree"
        checked={agree}
        onChange={onToggleAgree}
      />
      <label>아래 정보 제공에 동의합니다.</label>
    </CheckBoxContainer>
  );
}

// Styles
const CheckBoxContainer = styled.div<{ agree: boolean }>`
  display: flex;
  justify-content: center;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  transition: 0.12s;

  input {
    margin-right: 0.5rem;
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
  }

  ${(props) =>
    props.agree &&
    css`
      label {
        font-weight: bold;
        color: #0276c3;
      }
    `}
`;
