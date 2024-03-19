import type { Metadata } from 'next';
import { Service } from '@/components/education/service/Service';

export const metadata: Metadata = {
  title: '리더 커뮤니케이션 - 더와이컨설팅',
  description:
    '커뮤니케이션 교육, 조직의 성과, 효율적인 경영을 위한 리더의 훈련 프로그램 제시',
};

export default function LeaderPage() {
  const leaders = [
    {
      img: 'target',
      list: ['리더가 처음인 신임리더', '더 나은 리더가 되기를 고민하는 리더'],
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
      list: ['갈등관리', '리더의 회의법', '리더의 대화법'],
      end: true,
    },
  ];

  const leader: EducationType = {
    img: 'leader.svg',
    title: '리더 커뮤니케이션',
    body: '리더가 어떻게 말하느냐에 따라 조직의 성과, 문화를 좌우합니다. 하지만 커뮤니케이션의 정답은 없습니다.\n업무의 성격, 조직의 상황, 직원들의 성향, 리더의 성격 등의 영향을 받기 때문입니다.\n조직의 성과와 효율적인 경영을 위해 리더의 커뮤니케이션에 대한 훈련 프로그램을 제시합니다.',
    list: leaders,
  };

  return <Service service={leader} />;
}
