import { Privacy } from '@/components/etc/Privacy';

export default function PrivacyPage() {
  const First: CustomDocumentType = {
    title: '1. 처리하는 개인정보 항목',
    first: [
      {
        id: 0,
        firstTitle: '더와이컨설팅은 최소한의 개인정보를 수집하여 처리하고 있습니다.',
        firstChild: [
          {
            secondTitle: '가. 교육 문의',
            secondChild: [
              '필수항목: 이름, 비밀번호',
              '선택항목: 이메일주소, 휴대폰 번호',
            ],
          },
        ],
      },
      {
        id: 1,
        firstTitle: '더와이컨설팅은 다음과 같은 방법으로 개인정보를 수집합니다.',
        firstChild: [{ secondTitle: '이용자의 이용방법' }],
      },
    ],
  };

  const Second: CustomDocumentType = {
    title: '2. 개인정보의 처리목적',
    first: [
      {
        id: 0,
        firstTitle: `더와이컨설팅은 이용자의 소중한 개인정보를 '교육문의 글에 대한 답변 및 교육 내용 안내'의 목적으로만 이용하며 목적이 변경될 경우 사전에 이용자의 동의를 구하도록 하겠습니다.`,
      },
    ],
  };

  const Third: CustomDocumentType = {
    title: '3. 개인정보의 처리 및 보유기간',
    first: [
      {
        id: 0,
        firstTitle:
          '더와이컨설팅은 이용자의 개인 정보를 목적 달성을 위한 기간 동안에만 제한적으로 처리하고 있으며, 처리 목적이 달성되면 해당 이용자의 개인 정보의 경우는 별도로 저장 및 파기하고 있습니다.',
      },
      {
        id: 1,
        firstTitle:
          '교육 문의에 따른 개인정보는 3개월간 보관되며, 이후 해당 정보는 지체없이 파기 됩니다.',
      },
    ],
  };

  const Forth: CustomDocumentType = {
    title: '4. 개인정보의 제공 및 위탁',
    first: [
      {
        id: 0,
        firstTitle:
          '더와이컨설팅은 원칙적으로 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다.',
      },
    ],
  };

  const Fifth: CustomDocumentType = {
    title: '5. 개인정보의 파기',
    first: [
      {
        id: 0,
        firstTitle:
          '더와이컨설팅은 수기문서로 개인정보를 저장·기록하지 않으며 데이터베이스에 저장된 정보는 3개월 주기로 파기하고 있습니다.',
      },
    ],
  };

  const Sixth: CustomDocumentType = {
    title: '6. 개인정보의 안정성 확보 조치',
    first: [
      {
        id: 0,
        firstTitle:
          '더와이컨설팅은 이용자의 개인 정보를 가장 소중한 가치로 여기고 개인정보를 처리함에 있어서 다음과 같은 노력을 다하고 있습니다.',
        firstChild: [
          {
            secondTitle: '가. 이용자의 개인정보를 암호화하고 있습니다.',
            secondChild: [
              '이용자의 개인정보를 암호화된 통신구간을 이용하여 전송하고, 비밀번호 등 중요 정보는 암호화하여 보관하고 있습니다.',
            ],
          },
          {
            secondTitle:
              '나. 해킹이나 컴퓨터 바이러스로부터 보호하기 위해 노력하고 있습니다.',
            secondChild: [
              '해킹이나 컴퓨터 바이러스 등에 의해 이용자의 개인정보가 유출되거나 훼손되는 것을 막기 위해 지속적으로 확인·감시하고 있습니다.',
            ],
          },
          {
            secondTitle:
              '다. 소중한 개인정보에 접근할 수 있는 사람을 최소화하고 있습니다.',
          },
          {
            secondTitle:
              '라. 임직원에게 이용자의 개인정보 보호에 대해 정기적인 교육을 실시하고 있습니다.',
          },
        ],
      },
    ],
  };

  const Seventh: CustomDocumentType = {
    title: '7. 개인정보 자동 수집 장치의 설치, 운영 및 거부에 관한 사항',
    first: [],
  };

  const Eighth: CustomDocumentType = {
    title: '8. 개인정보 보호책임자 등',
    first: [
      {
        id: 0,
        firstTitle:
          '홈페이지를 이용하시는 과정에서 개인정보보호 관련 문의, 불만, 조언이나 기타 사항이 발생 시 개인정보 보호 책임자에게 연락주시기 바랍니다.',
        firstChild: [
          {
            secondTitle: '개인정보 보호책임자',
            secondChild: ['책임자: 김현성', '문의: thewhy@thewhy.kr'],
          },
          {
            secondTitle:
              '개인정보가 침해되어 이에 대한 신고나 상담이 필요할 경우 아래 기관에 문의하셔서 도움을 받으실 수 있습니다.',
            secondChild: [
              '개인정보침해 신고센터: (국번없이)118 https://privacy.kisa.or.kr',
              '대검찰청 사이버수사과: (국번없이)1301 cid@spo.go.kr',
              '경찰청 사이버안전국: (국번없이)182 https://cyberbureau.police.go.kr/prevention/sub4_4.jsp?mid=020505',
            ],
          },
        ],
      },
    ],
  };

  return (
    <Privacy data={[First, Second, Third, Forth, Fifth, Sixth, Seventh, Eighth]} />
  );
}
