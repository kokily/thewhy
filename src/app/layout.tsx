import type { Metadata } from 'next';
import localFont from 'next/font/local';

import QueryWrapper from '@/helper/wrapper/QueryWrapper';
import SessionWrapper from '@/helper/wrapper/SessionWrapper';
import StyledWrapper from '@/helper/wrapper/StyledWrapper';
import ToastWrapper from '@/helper/wrapper/ToastWrapper';
import { PageTemplate } from '@/components/common/PageTemplate';

import 'react-toastify/ReactToastify.css';

const yoon310 = localFont({
  src: '../../public/fonts/YDIYGO310.woff2',
  display: 'swap',
});

const title = '더와이 컨설팅 - The Why Consulting';

export const metadata: Metadata = {
  metadataBase: new URL('https://thewhy.kr'),
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={yoon310.className}>
        <SessionWrapper>
          <QueryWrapper>
            <StyledWrapper>
              <PageTemplate>{children}</PageTemplate>
            </StyledWrapper>
            <ToastWrapper />
          </QueryWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}
