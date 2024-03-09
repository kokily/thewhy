'use client';

import localFont from 'next/font/local';
import styled from 'styled-components';
import { LinksList } from './links/LinksList';

// Fonts
const yoon360 = localFont({
  src: '../../../public/fonts/YDIYGO360.woff2',
  display: 'swap',
});

interface Props {
  links: Array<HomeLinks>;
}

export function HomeLinks({ links }: Props) {
  return (
    <HomeLinksContainer>
      <HomeLinksTopContent>
        <HomeLinksTitle className={yoon360.className}>교육 프로그램</HomeLinksTitle>
        <HomeLinksLead>
          더와이 컨설팅에서 진행하는 맞춤화된 교육 프로그램입니다.
        </HomeLinksLead>
      </HomeLinksTopContent>

      <LinksList links={links} />
    </HomeLinksContainer>
  );
}

// Styles
const HomeLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeLinksTopContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

const HomeLinksTitle = styled.h2`
  font-size: 31px;
  font-weight: 300;
  line-height: 42px;
  color: #463884;
  margin: 0;
  margin-bottom: 0.5rem;
`;

const HomeLinksLead = styled.p`
  word-break: keep-all;
  font-size: 24px;
  font-weight: 300;
  letter-spacing: -0.05rem;
  color: #808080;
  margin: 0;
`;
