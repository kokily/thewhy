'use client';

import Image from 'next/image';
import styled from 'styled-components';

import { media } from '@/helper/client/styles';
import { Contents } from './contents/Contents';

export function About() {
  return (
    <AboutContainer>
      <Image
        src="/images/about/about.png"
        width={1110}
        height={297}
        alt="더와이컨설팅 소개"
        priority
      />

      <Contents />

      <AboutBottom>
        <AboutTitle>더와이컨설팅이 가는 길</AboutTitle>
        <Image
          src="/images/about/about02.png"
          width={1110}
          height={1049}
          alt="더와이컨설팅이 가는 길"
          priority
        />
      </AboutBottom>
    </AboutContainer>
  );
}

// Styles
const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;

    ${media.large} {
      max-width: 760px;
    }

    ${media.medium} {
      height: auto;
    }
  }
`;

const AboutBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3.5rem;
`;

const AboutTitle = styled.h4`
  font-size: 31px;
  font-weight: 600;
  color: rgb(70, 56, 132);
  &:after {
    content: '';
    display: block;
    width: 120px;
    border-bottom: 3px solid rgb(51, 154, 240);
    margin: 20px auto;
  }
`;
