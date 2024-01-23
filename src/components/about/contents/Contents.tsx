import Image from 'next/image';
import localFont from 'next/font/local';
import styled from 'styled-components';

import { media } from '@/helper/client/styles';
import { useMobile } from '@/helper/client/hooks';
import { DesktopContent } from './DesktopContent';
import { MobileContent } from './MobileContent';

const yoon320 = localFont({
  src: '../../../../public/fonts/YDIYGO320.woff2',
  display: 'swap',
});

export function Contents() {
  const isSmall = useMobile();

  return (
    <ContentsContainer>
      <ContentsLayout className="text">
        <ContentsTitle className={yoon320.className}>Why The Y</ContentsTitle>

        {isSmall ? <MobileContent /> : <DesktopContent />}
      </ContentsLayout>

      <ContentsImageBox>
        <Image
          src="/images/about/about01.png"
          width={445}
          height={631}
          alt="더와이컨설팅"
          priority
        />
      </ContentsImageBox>
    </ContentsContainer>
  );
}

// Styles
const ContentsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3.5rem;
  width: 100%;

  ${media.large} {
    max-width: 760px;
  }

  ${media.medium} {
    max-width: 760px;
    width: 100%;
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    .text {
      flex: none !important;
      width: 100%;
    }

    .image {
      display: none;
    }
  }
`;

const ContentsLayout = styled.div`
  flex: 0 0 60%;
`;

const ContentsTitle = styled.h2`
  font-size: 31px;
  font-weight: 600;
  font-style: normal;
  color: #463884;
  -webkit-animation-name: maskUp;
  animation-name: maskUp;
  animation-delay: 100ms;
  animation-duration: 1s;
`;

const ContentsImageBox = styled.div`
  flex: 0 0 40%;
  height: auto;
`;
