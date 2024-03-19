import type { Metadata } from 'next';
import { Ability } from '@/components/education/ability/Ability';

export const metadata: Metadata = {
  title: '직무 역량강화 - 더와이컨설팅',
  description:
    '직무역량 강화, 직무분석을 통해 체계적인 교육훈련 프로그램 도출 및 제시',
};

export default function AbilityPage() {
  return <Ability />;
}
