import type { Metadata } from 'next';

import { Service } from '@/components/education/service/Service';

export const metadata: Metadata = {
  title: '비즈니스 커뮤니케이션 - 더와이컨설팅',
  description:
    '커뮤니케이션 교육, 더 나은 비즈니스 역량을 고민하는 고객사를 위한 프로그램 제시',
};

export default function BusinessPage() {
  const businesses = [
    {
      img: 'target',
      list: [
        '직장생활이 처음인 신입사원',
        '더 나은 비즈니스 업무역량을 갖추고 싶은 경력사원',
        '비즈니스 역량 향상을 고민하는 고객사',
      ],
    },
    {
      img: 'character',
      list: [
        '사전 미팅을 통한 고객의 이슈 및 니즈 파악',
        '맞춤화된 프로그램 개발 및 반영',
        '사후 보고서 제출 (교육 결과물에 대한 피드백 필요시)',
      ],
    },
    {
      img: 'program',
      list: [
        '보고서 작성법',
        '업무보고의 기술',
        '비즈니스 대화법',
        '비즈니스 매너 (비즈니스 복장 용모, 명함 수수 등)',
        '업무 메뉴얼 제작',
      ],
      end: true,
    },
  ];

  const business: EducationType = {
    img: 'business.svg',
    title: '비즈니스 커뮤니케이션',
    body: '비즈니스 현장에서 발생되는 다양한 상황에 대한 교육 프로그램을 제시합니다.\n사회생활이 처음인 신입사원에게 회사 생활에 대한 매너, 대화법 등 더 나은 비즈니스 역량을 고민하는 고객사를 위한 프로그램을 제시합니다.',
    list: businesses,
  };

  return <Service service={business} />;
}
