import type { Metadata } from 'next';

import { Service } from '@/components/education/service/Service';

export const metadata: Metadata = {
  title: '서비스 커뮤니케이션 - 더와이컨설팅',
  description: '커뮤니케이션 교육, 맞춤화된 교육 프로그램 제시',
};

export default function ServicePage() {
  const services = [
    {
      img: 'target',
      list: [
        '서비스 현장에서 대면/비대면으로 고객을 응대하는 고객사',
        '서비스 역량을 높이고 싶은 개인 및 담당자',
        '현장의 서비스 응대능력을 평가하고 싶은 담당자',
        '더 나은 서비스질을 위해 고민하는 모든 분',
      ],
    },
    {
      img: 'character',
      list: [
        '사전 미팅을 통한 고객의 이슈 및 니즈 파악',
        '맞춤화된 프로그램 개발 및 반영',
        '서비스 현장 경험 강사진',
        '사후 보고서 제출 (교육 결과물에 대한 피드백 필요시',
      ],
    },
    {
      img: 'program',
      list: [
        '서비스 마인드 향상',
        '서비스 역량 강화',
        '전화응대 역량 강화',
        '불만고객 응대',
        '서비스인의 이미지메이킹',
        '서비스 품질 모니터링',
        '서비스 매뉴얼 제작',
      ],
      end: true,
    },
  ];

  const service: EducationType = {
    img: 'service.svg',
    title: '서비스 커뮤니케이션',
    body: '서비스 현장에서 바람직한 커뮤니케이션은 무엇일까요? 친절성, 적극성 등 정형화된 내용이 아닌 고객사의 요구에 맞춰 사전 설문을 통해 맞춤화된 교육 프로그램을 제시합니다.',
    list: services,
  };

  return <Service service={service} />;
}
