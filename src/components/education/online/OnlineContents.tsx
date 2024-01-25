import Image from 'next/image';
import localFont from 'next/font/local';
import styled from 'styled-components';
import clsx from 'clsx';

import { media } from '@/helper/client/styles';

const yoon320 = localFont({
  src: '../../../../public/fonts/YDIYGO320.woff2',
  display: 'swap',
});

export function OnlineContents() {
  return (
    <ContentsContainer>
      <ContentsRow>
        <ContentsCol>
          <Image
            src="/images/education/online01.png"
            width={100}
            height={70}
            alt="Online Program"
            priority
          />
        </ContentsCol>

        <ContentsList className={yoon320.className}>
          줌 (ZOOM), 웹엑스 (Webex) 등 익히 알려진 실시간 형태의
          <br />
          온라인 교육이 가능합니다.
        </ContentsList>
      </ContentsRow>

      <ContentsRow>
        <ContentsCol>
          <Image
            src="/images/education/online02.png"
            width={130}
            height={70}
            alt="Online Program"
            priority
          />
        </ContentsCol>

        <ContentsList className={clsx(yoon320.className, 'end')}>
          고객사의 요구 사항에 따라 동영상 형태의 교육 프로그램을
          <br />
          개발, 운영합니다.
        </ContentsList>
      </ContentsRow>
    </ContentsContainer>
  );
}

// Styles
const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3.5rem;
  max-width: 720px;
  width: 100%;

  ul {
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
    border-top: 2px solid rgb(73, 53, 134);
    font-size: 17px;
    color: #777;
    margin-top: 0;
    padding-top: 1.2rem;
    &.end {
      border-bottom: 2px solid rgb(73, 53, 134);
      padding-bottom: 1.2rem;
    }
    li {
      line-height: 1.6;
    }
  }
`;

const ContentsRow = styled.div`
  display: flex;
  width: 100%;

  ${media.medium} {
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }
`;

const ContentsCol = styled.div`
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100px;
    height: auto;
  }
`;

const ContentsList = styled.ul`
  flex: 0 0 66.666667%;
  max-width: 66.666667%;
  border-top: 2px solid rgb(73, 53, 134);
  font-size: 17px;
  color: #777;
  margin-top: 0;
  padding-top: 1.2rem;

  &.end {
    border-bottom: 2px solid rgb(73, 53, 134);
    padding-bottom: 1.2rem;
  }
`;

const ContentsItem = styled.li`
  line-height: 1.6;
`;
