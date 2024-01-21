import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import { media } from '@/helper/client/styles';
import { TopLeft } from './TopLeft';
import { TopRight } from './TopRight';

export function HeaderTop() {
  return (
    <HeaderTopContainer>
      <TopLeft />

      <Link href="/">
        <Image
          src="/svg/Logo.svg"
          alt="logo"
          width={120}
          height={96}
          priority={true}
        />
      </Link>

      <TopRight />
    </HeaderTopContainer>
  );
}

// Styles
const HeaderTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1110px;
  border-bottom: 0.4px solid #dfdfdf;
  transition: 0.2s all;

  ${media.large} {
    max-width: 760px;
  }

  ${media.medium} {
    justify-content: center;
  }

  ${media.small} {
    img {
      width: 210px;
    }
  }

  img {
    cursor: pointer;
  }
`;
