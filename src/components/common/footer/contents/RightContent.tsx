import Link from 'next/link';
import { MdKeyboardArrowRight } from 'react-icons/md';
import styled from 'styled-components';

import { media } from '@/helper/client/styles';

export function RightContent() {
  return (
    <RightContainer>
      <RightTitle>회사소개</RightTitle>
      <RightLead>
        더와이컨설팅은 행복한 삶을 꿈꾸는 &quot;커뮤니케이션&quot; 전문 교육
        컨설팅 회사입니다.
      </RightLead>
      <RightLead>
        우리가 존재하는 이유는 커뮤니케이션을 통해 개인과 조직의 행복을 돕는
        것입니다.
      </RightLead>
      <RightLead>
        우리의 비전은 대한민국의 직장인들이 모두 행복해 할 때까지,
      </RightLead>
      <RightLead>
        그래서 대한민국을 대표하는 커뮤니케이션 전문가가 되는 것입니다.
      </RightLead>

      <RightLinksBox>
        <RightLayout>
          <RightTitle>주요링크</RightTitle>

          <RightList>
            <RightItem>
              <MdKeyboardArrowRight size={17} color="#0088cc" />
              <Link href="/question">교육문의</Link>
            </RightItem>
            <RightItem>
              <MdKeyboardArrowRight size={17} color="#0088cc" />
              <Link href="/education">교육 프로그램</Link>
            </RightItem>
            <RightItem>
              <MdKeyboardArrowRight size={17} color="#0088cc" />
              <Link href="/online">온라인 프로그램</Link>
            </RightItem>
            <RightItem>
              <MdKeyboardArrowRight size={17} color="#0088cc" />
              <Link href="/stories">The Y 이야기</Link>
            </RightItem>
          </RightList>
        </RightLayout>
      </RightLinksBox>
    </RightContainer>
  );
}

// Styles
const RightContainer = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  position: relative;
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;

  ${media.small} {
    display: inline-block;
    flex: none;
    max-width: 370px;
  }
`;

const RightTitle = styled.h5`
  font-size: 1rem;
  font-weight: 600;
  line-height: 18px;
  margin: 0 0 14px 0;
  margin-bottom: 0.25rem;
  color: #fff;
  text-align: left;
`;

const RightLead = styled.p`
  color: #777;
  margin-top: 0.6rem;
  margin-bottom: 0.6rem;
  text-align: left;
`;

const RightLinksBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-right: -15px;
  margin-left: -15px;
`;

const RightLayout = styled.div`
  position: relative;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  flex: 0 0 50%;
  max-width: 50%;
  margin-bottom: 0;
  margin-top: 1rem;
`;

const RightList = styled.ul`
  margin-top: 0.5rem;
  list-style: none;
  padding-left: 0;
  padding-right: 0;
`;

const RightItem = styled.li`
  position: relative;
  padding-left: 20px;
  margin-bottom: 0.4rem;
  color: #777;
  text-align: left;
  svg {
    position: absolute;
    top: 2px;
    left: 0px;
  }
  a {
    transition: 0.12s all;
  }
  a:hover {
    color: white;
    position: relative;
    left: 2px;
  }
`;
