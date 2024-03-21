'use client';

import Image from 'next/image';
import localFont from 'next/font/local';
import styled from 'styled-components';
import { media } from '@/helper/client/style';
import { ServiceFooter } from '../service/ServiceFooter';
import { OnlineContents } from './OnlineContents';

const yoon330 = localFont({
  src: '../../../../public/fonts/YDIYGO330.woff2',
  display: 'swap',
});

const yoon320 = localFont({
  src: '../../../../public/fonts/YDIYGO320.woff2',
  display: 'swap',
});

export function Online() {
  return (
    <OnlineContainer>
      <Image
        src="/svg/online.svg"
        width={1110}
        height={296}
        alt="온라인 교육"
        priority
      />

      <OnlineHeader>
        <OnlineTitle className={yoon330.className}>
          온라인(On-Line) 프로그램
        </OnlineTitle>

        <OnlinePane className={yoon320.className}>
          실시간 그리고 맞춤형 형태로 고객사가 원하는 교육 프로그램을 개발하고 진행
          가능합니다.
          <br />
          언제 어디서든 장소의 제약 없이 우리의 행복한 성장을 원하는 곳에
          더와이컨설팅이 온라인 교육을 진행합니다.
        </OnlinePane>
      </OnlineHeader>

      <OnlineContents />

      <ServiceFooter />
    </OnlineContainer>
  );
}

// Styles
const OnlineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1110px;

  img {
    width: 100%;

    ${media.large} {
      max-width: 760px;
    }
  }
`;

const OnlineHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 3.5rem;
  max-width: 720px;

  ${media.medium} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const OnlineTitle = styled.h2`
  font-size: 26px;
  font-weight: 600;
  color: #493586;
`;

const OnlinePane = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: 1.4;
  color: #777;
  word-break: keep-all;
  margin: 0 0 20px;
  white-space: pre-wrap;
`;
