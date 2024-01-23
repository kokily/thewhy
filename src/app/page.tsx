import { HomeImages } from '@/components/home/HomeImages';
import { HomeLinks } from '@/components/home/HomeLinks';

export default function Home() {
  const slides = ['/images/main/main.png'];

  const links = [
    {
      id: 0,
      url: '/education',
      img: '/images/main/main01.png',
      title: '서비스 커뮤니케이션',
      sub: '서비스 현장에서 역량 향상을 위한 커뮤니케이션 프로그램',
    },
    {
      id: 1,
      url: '/education/business',
      img: '/images/main/main02.png',
      title: '비즈니스 커뮤니케이션',
      sub: '비즈니스 현장에서 역량 향상을 위한 커뮤니케이션 프로그램',
    },
    {
      id: 2,
      url: '/education/leader',
      img: '/images/main/main03.png',
      title: '리더 커뮤니케이션',
      sub: '조직의 성과와 효율적인 경영을 위한 리더의 커뮤니케이션 훈련 프로그램',
    },
    {
      id: 3,
      url: '/education/extended',
      img: '/images/main/main04.png',
      title: 'Extended-DISC 커뮤니케이션',
      sub: '개인, 팀, 조직의 소통 능력 활성화와 교육훈련을 위한 행동성향 분석 프로그램',
    },
    {
      id: 4,
      url: '/education/ability',
      img: '/images/main/main05.png',
      title: '직무역량 강화 프로그램',
      sub: '직무분석을 기반으로 직무역량 강화를 위한 교육훈련 프로그램',
    },
    {
      id: 5,
      url: '/education/online',
      img: '/images/main/main06.png',
      title: '온라인(On-Line) 프로그램',
      sub: '실시간 또는 동영상 형태의 온라인 프로그램',
    },
  ];

  return (
    <>
      <HomeImages slides={slides} />
      <HomeLinks links={links} />
    </>
  );
}
