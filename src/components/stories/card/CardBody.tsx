import type { Story } from '@prisma/client';
import { formatDate } from '@/helper/client/utils';
import localFont from 'next/font/local';
import styled from 'styled-components';

const yoon310 = localFont({
  src: '../../../../public/fonts/YDIYGO310.woff2',
  display: 'swap',
});

interface Props {
  story: Story;
}

export function CardBody({ story }: Props) {
  return (
    <Body className={yoon310.className}>
      {formatDate(new Date(story.createdAt).toLocaleDateString())} 작성
    </Body>
  );
}

// Styles
const Body = styled.p`
  margin: 0 0 20px;
  text-align: center;
  max-width: 100%;
  height: 52px;
  word-break: keep-all;
  font-size: 19px;
  color: #616161;
  line-height: 1.3;
  margin-bottom: 0;
`;
