import localFont from 'next/font/local';
import styled from 'styled-components';

import { media } from '@/helper/client/styles';

const yoon330 = localFont({
  src: '../../../../public/fonts/YDIYGO330.woff2',
  display: 'swap',
});

const yoon320 = localFont({
  src: '../../../../public/fonts/YDIYGO320.woff2',
  display: 'swap',
});

interface Props {
  title: string;
  body: string;
}

export function ServiceHeader({ title, body }: Props) {
  return (
    <HeaderContainer>
      <HeaderTitle className={yoon330.className}>{title}</HeaderTitle>
      <HeaderBody className={yoon320.className}>{body}</HeaderBody>
    </HeaderContainer>
  );
}

// Styles
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 3.5rem;
  max-width: 720px;

  ${media.medium} {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  ${media.small} {
    margin-top: 0px;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 26px;
  font-weight: 600;
  color: #493586;
`;

const HeaderBody = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: 1.4;
  color: #777;
  word-break: keep-all;
  margin: 0 0 20px;
  white-space: pre-wrap;
`;
