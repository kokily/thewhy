import type { ChangeEvent, SyntheticEvent } from 'react';
import styled, { css } from 'styled-components';

import { media } from '@/helper/client/styles';

interface Props {
  inputs: SendMailPayload;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSendMail: (e: SyntheticEvent) => void;
}

export function SendMail({ inputs, onChange, onSendMail }: Props) {
  const { name, email, subject, body } = inputs;

  return (
    <MailContainer>
      <h2>메일 보내기</h2>
      <p>Email로 문의를 보내주세요~!</p>

      <MailForm>
        <div className="row sep">
          <div>
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label>이메일</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <label>제목</label>
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={onChange}
            required
          />
        </div>
        <div className="row">
          <label>문의 내용</label>
          <textarea
            rows={8}
            name="body"
            value={body}
            onChange={onChange}
            required
          />
        </div>

        <div className="row">
          <MailButton onClick={onSendMail}>전송하기</MailButton>
        </div>
      </MailForm>
    </MailContainer>
  );
}

/*
<Container>
      <Form>

        <div className="row">
          <Button onClick={rest.onSubmit}>전송하기</Button>
          <Button red onClick={rest.onClear}>
            초기화
          </Button>
        </div>
      </Form>
    </Container>
*/

// Styles
const MailContainer = styled.div`
  flex: 0 0 50%;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  font-family: 'Poppins', Arial, sans-serif;
  -webkit-animation-name: mask5Up;
  animation-name: mask5Up;
  animation-delay: 100ms;
  animation-duration: 1s;

  h2 {
    font-size: 2.3em;
    font-weight: 500;
    font-style: normal;
    margin: 0.5rem 0 0 0;
    color: #212529;
  }

  p {
    line-height: 26px;
    color: #777;
    margin-bottom: 1.5rem;
  }

  ${media.small} {
    margin-bottom: 4rem;
  }
`;

const MailForm = styled.form`
  margin-left: -5px;
  margin-right: -5px;

  .row {
    width: 100%;
    margin-bottom: 1.2rem;
    padding-left: 5px;
    padding-right: 5px;

    label {
      display: inline-block;
      font-size: 0.9em;
      font-weight: 300;
      margin-bottom: 0.5rem;
      color: #777;
    }

    input {
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
    }

    textarea {
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
    }
  }

  .sep {
    display: flex;
    justify-content: space-around;

    div {
      flex: 0 0 50%;
      max-width: 50%;
      padding-left: 2px;
      padding-right: 2px;
    }
  }
`;

const MailButton = styled.button<{ red?: boolean }>`
  padding: 0.5rem 0.8rem;
  margin-right: 0.5rem;
  color: #0088cc;
  background-color: white;
  border: 2px solid #0088cc;
  border-radius: 5px;
  cursor: pointer;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;

  &:hover {
    color: white;
    background-color: #0088cc;
  }

  ${(props) =>
    props.red &&
    css`
      color: red;
      border: 2px solid red;

      &:hover {
        color: white;
        background-color: red;
      }
    `}
`;
