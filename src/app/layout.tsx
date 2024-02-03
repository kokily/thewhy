import type { Metadata } from 'next';
import localFont from 'next/font/local';

import SessionWrapper from '@/helper/wrapper/SessionWrapper';
import QueryWrapper from '@/helper/wrapper/QueryWrapper';
import StyledWrapper from '@/helper/wrapper/StyledWrapper';
import ToastWrapper from '@/helper/wrapper/ToastWrapper';

import 'react-toastify/ReactToastify.css';

import { PageTemplate } from '@/components/common/PageTemplate';

const yoon310 = localFont({
  src: '../../public/fonts/YDIYGO310.woff2',
  display: 'swap',
});

const title = '더와이 컨설팅 - The Why Consulting';

export const metadata: Metadata = {
  title,
  description:
    '더와이컨설팅은 개인과 조직의 행복한 관계를 꿈꾸는 커뮤니케이션 교육 전문기업입니다.',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://thewhy.kr',
    title,
    siteName: 'The Y Consulting',
    images: [
      {
        url: 'https://thewhy.kr/images/main-logo.png',
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    title,
    site: 'https://thewhy.kr',
    images: [
      {
        url: 'https://thewhy.kr/images/main-logo.png',
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={yoon310.className}>
        <SessionWrapper>
          <QueryWrapper>
            <StyledWrapper>
              <PageTemplate>{children}</PageTemplate>
              <ToastWrapper />
            </StyledWrapper>
          </QueryWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}
