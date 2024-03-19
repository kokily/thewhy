'use client';

import { media } from '@/helper/client/style';
import localFont from 'next/font/local';
import styled from 'styled-components';
import { DocumentItem } from '../common/DocumentItem';

const yoon320 = localFont({
  src: '../../../public/fonts/YDIYGO320.woff2',
  display: 'swap',
});

interface Props {
  data: Array<CustomDocumentType>;
}

export function Term({ data }: Props) {
  return (
    <TermContainer className={yoon320.className}>
      <TermHeader>
        <div className="date">시행일자 : 2021. 미정.</div>
        안녕하세요. 커뮤니케이션을 통해 개인과 조직의 행복을 돕는
        (주)더와이컨설팅(이하&apos;회사&apos;)입니다.
        <br />
        (주)더와이컨설팅 이용약관(이하&apos;이 약관&apos;)은 (주)더와이컨설팅 서비스
        이용과 관련한 회사와 회원 간의 권리와 의무에 대한 내용을 담고 있습니다. 다만
        회사는 다양한 서비스를 제공하는 과정에서 이 약관 외에 개별 약관 또는 정책
        등을 적용할 수 있습니다. 회사는 회원의 권리를 보호하기 위하여 위와 같은
        내용을 쉽게 알 수 있도록 작성하여 명확하게 표시하고 있습니다.
        <br />
        (주)더와이컨설팅 서비스 이용 전 꼭 확인 부탁드립니다.
      </TermHeader>

      <Hr />

      {data.map((docu) => (
        <DocumentItem key={docu.title} body={docu} />
      ))}

      <TermFooter>
        ㈜더와이컨설팅 서비스와 관련하여 궁금하신 사항이 있으시면 고객센터(대표번호:
        050-5055-7221/ 평일 09:00~18:00)로 문의 주시기 바랍니다.
      </TermFooter>
    </TermContainer>
  );
}

// Styles
const TermContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1110px;
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;

  ${media.small} {
    padding-left: 20px;
    padding-right: 20px;
  }

  .concul {
    margin-top: 1.4rem;
    text-align: center;
    color: #777;
    text-decoration: underline;
  }
`;

const TermHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 0.95rem;
  font-weight: 300;
  color: #777;
  word-break: keep-all;
  margin-bottom: 1.5rem;
  line-height: 1.6;

  .date {
    font-size: 0.9rem;
    margin-left: auto;
    margin-bottom: 1.5rem;
  }
`;

const Hr = styled.hr`
  width: 100%;
  background: rgba(0, 0, 0, 0.06);
  border: 0;
  height: 1px;
  margin: 22px 0;
`;

const TermFooter = styled.div`
  margin-top: 1.4rem;
  text-align: center;
  color: #777;
  text-decoration: underline;
`;
