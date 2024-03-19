import type { Metadata } from 'next';
import { Online } from '@/components/education/online/Online';

export const metadata: Metadata = {
  title: '온라인 프로그램 - 더와이컨설팅',
  description:
    '온라인 프로그램, 실시간 그리고 맞춤형 형태로 고객사가 원하는 교육 프로그램 개발 및 진행',
};

export default function OnlinePage() {
  return <Online />;
}
