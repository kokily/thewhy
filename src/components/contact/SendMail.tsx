import type { ChangeEvent, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { Input } from './elements/Input';
import { media } from '@/helper/client/style';
import { TextArea } from './elements/TextArea';

interface Props {
  inputs: SendMailPayload;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSendMail: (e: SyntheticEvent) => void;
}

export function SendMail({ inputs, onChange, onSendMail }: Props) {
  const { name, email, subject, body } = inputs;

  return (
    <MailContainer>
      <MailTitle>메일 보내기</MailTitle>
      <MailBody>Email로 문의를 보내주세요~!</MailBody>

      <MailForm>
        <Row className="split">
          <div>
            <Input label="이름" name="name" value={name} onChange={onChange} />
          </div>
          <div>
            <Input label="이메일" name="email" value={email} onChange={onChange} />
          </div>
        </Row>

        <Row>
          <Input label="제목" name="subject" value={subject} onChange={onChange} />
        </Row>

        <Row>
          <TextArea label="문의 내용" name="body" body={body} onChange={onChange} />
        </Row>

        <Row>
          <Button onClick={onSendMail}>메일 전송</Button>
        </Row>
      </MailForm>
    </MailContainer>
  );
}

// Styles
const MailContainer = styled.div`
  flex: 0 0 50%;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  -webkit-animation-name: mask5Up;
  animation-name: mask5Up;
  animation-delay: 100ms;
  animation-duration: 1s;

  ${media.small} {
    margin-bottom: 4rem;
  }
`;

const MailTitle = styled.h2`
  font-size: 2.3em;
  font-weight: 500;
  font-style: normal;
  margin: 0.5rem 0 0 0;
  color: #212529;
`;

const MailBody = styled.p`
  line-height: 26px;
  color: #777;
  margin-bottom: 1.5rem;
`;

const MailForm = styled.div`
  margin-left: -5px;
  margin-right: -5px;
`;

const Row = styled.div`
  width: 100%;
  margin-bottom: 1.2rem;
  padding-left: 5px;
  padding-right: 5px;

  &.split {
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

const Button = styled.button`
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
`;
