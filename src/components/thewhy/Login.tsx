import type { RefObject, SyntheticEvent } from 'react';
import styled from 'styled-components';

interface Props {
  passwordRef: RefObject<HTMLInputElement>;
  onLogin: (e: SyntheticEvent) => void;
}

export function Login({ passwordRef, onLogin }: Props) {
  return (
    <LoginContainer>
      <LoginLayout>
        <h2>로그인</h2>

        <form onSubmit={onLogin}>
          <LoginInputBox>
            <label htmlFor="password">
              비밀번호 <span>*</span>
            </label>

            <LoginInput
              type="password"
              name="password"
              ref={passwordRef}
              placeholder="비밀번호"
              required
            />
          </LoginInputBox>

          <LoginButtonBox>
            <LoginButton type="submit">로그인</LoginButton>
          </LoginButtonBox>
        </form>
      </LoginLayout>
    </LoginContainer>
  );
}

// Styles
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`;

const LoginLayout = styled.div`
  width: 100%;
  max-width: 470px;

  h2 {
    font-weight: 500;
  }
`;

const LoginInputBox = styled.div`
  label {
    font-size: 14px;
    color: #212529;
  }
  span {
    color: #ff5b5b;
  }
`;

const LoginInput = styled.input`
  display: block;
  width: 100%;
  height: calc(1.5em + 1rem + 2px);
  font-size: 1.2em;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  color: #495057;
  -webkit-appearance: none;
  margin-top: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.09);
`;

const LoginButtonBox = styled.div`
  margin-top: 1rem;
`;

const LoginButton = styled.button`
  width: 100%;
  font-size: 1em;
  font-weight: 700;
  padding: 0.8rem 1.5rem;
  color: white;
  background: #212529;
  border: 1px solid #212529;
  cursor: pointer;

  &:active {
    transform: translateZ(3px);
  }
`;
