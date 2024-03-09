import type { Metadata } from 'next';
import { Service } from '@/components/education/service/Service';

export const metadata: Metadata = {
  title: '확장된 DISC 커뮤니케이션 - 더와이컨설팅',
  description: '커뮤니케이션 교육, 확장된 DISC 진단을 통한 조직 성향 분석',
};

export default function ExtendedPage() {
  const extendeds = [
    {
      img: 'target',
      list: [
        '소통 및 조직 활성화에 이슈가 있는 조직',
        '개인의 행동성향 이해가 필요한 조직',
        '팀진단을 통해 팀을 효과적으로 운영하고 싶은 관리자',
        '조직에 맞는 인재상을 찾고 싶은 관리자',
        '개인의 이해를 통한 조직의 소통을 활성화하고 싶은 관리자',
      ],
    },
    {
      img: 'character',
      list: ['DISC 진단을 통한 개인별, 팀별 리포트 제공'],
    },
    {
      img: 'program',
      list: [
        '개인 성향 진단',
        '팀 성향 진단',
        '팀&조직문화 진단',
        'DISC for 서비스 역량',
        'DISC for 세일즈 역량',
        'DISC for 리더의 역량',
      ],
      end: true,
    },
  ];

  const extended: EducationType = {
    img: 'extended.svg',
    title: 'Extended-DISC 커뮤니케이션',
    body: '확장된 DISC 진단을 통해 조직 구성원 개인의 성향뿐만 아니라 조직의 성향을 분석합니다.\n개인, 팀, 조직의 소통 능력 활성화 뿐만 아니라 채용, 배치, 교육훈련을 위한 기초 데이터를 제공합니다.\n*Extended-DISC가 궁금하신 분, DISC의 성향 분석을 통한 교육 프로그램을 염두에 두고 계시다면 문의하세요.',
    list: extendeds,
  };

  return <Service service={extended} />;
}
