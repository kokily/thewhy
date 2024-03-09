import type { ChangeEvent, SyntheticEvent } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { media } from '@/helper/client/style';
import { SendMail } from './SendMail';
import { ContactInfo } from './ContactInfo';

interface Props {
  inputs: SendMailPayload;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSendMail: (e: SyntheticEvent) => void;
}

export function Contact({ inputs, onChange, onSendMail }: Props) {
  return (
    <ContactContainer>
      <Image
        src="/images/about/about.png"
        width={1110}
        height={297}
        alt="Contact us"
        priority={true}
      />

      <ContactContents>
        <SendMail inputs={inputs} onChange={onChange} onSendMail={onSendMail} />
        <ContactInfo />
      </ContactContents>
    </ContactContainer>
  );
}

// Styles
const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
  }

  ${media.large} {
    img {
      max-width: 760px;
    }
  }

  ${media.medium} {
    img {
      height: auto;
    }
  }
`;

const ContactContents = styled.div`
  display: flex;
  width: 100%;
  margin-top: 3.5rem;

  ${media.large} {
    max-width: 760px;
  }

  ${media.medium} {
    display: block;
    width: 100%;
  }
`;
