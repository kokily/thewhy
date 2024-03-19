import { About } from '@/components/about/About';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why The Y - 더와이컨설팅',
  description:
    '더와이컨설팅은 개인과 조직의 행복한 관계를 꿈꾸는 커뮤니케이션 전문기업입니다.',
};

export default function AboutPage() {
  return <About />;
}
