import Image from 'next/image';
import localFont from 'next/font/local';
import styled from 'styled-components';
import clsx from 'clsx';

import { media } from '@/helper/client/styles';

const yoon320 = localFont({
  src: '../../../../public/fonts/YDIYGO320.woff2',
  display: 'swap',
});

interface Props {
  list: Array<ListType>;
}

export function ServiceBody({ list }: Props) {
  return (
    <BodyContainer>
      {list.map((item, i) => (
        <BodyRow key={i}>
          <BodyCol>
            <Image
              src={`/images/education/${item.img}.png`}
              width={100}
              height={104}
              alt="서비스 커뮤니케이션"
              priority
            />
          </BodyCol>

          <BodyList
            className={clsx(yoon320.className, {
              ['end']: item.end,
            })}
          >
            {item.list.map((data, j) => (
              <BodyItem key={j}>{data}</BodyItem>
            ))}
          </BodyList>
        </BodyRow>
      ))}
    </BodyContainer>
  );
}

// Styles
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3.5rem;
  max-width: 720px;
  width: 100%;
`;

const BodyRow = styled.div`
  display: flex;
  width: 100%;

  ${media.medium} {
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }
`;

const BodyCol = styled.div`
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100px;
    height: auto;
  }
`;

const BodyList = styled.ul`
  flex: 0 0 66.666667%;
  max-width: 66.666667%;
  width: 100%;
  border-top: 2px solid rgb(73, 53, 134);
  font-family: 윤고딕320;
  font-size: 17px;
  color: #777;
  margin-top: 0;
  padding-top: 1.2rem;
  padding-left: 1.8rem;

  &.end {
    border-bottom: 2px solid rgb(73, 53, 134);
    padding-bottom: 1.2rem;
  }
`;

const BodyItem = styled.li`
  line-height: 1.6;
`;
